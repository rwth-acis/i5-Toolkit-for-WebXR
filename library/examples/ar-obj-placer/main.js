import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { ARButton } from 'https://unpkg.com/three@0.127.0/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';

import { Greeter, HelloGreeter } from "../../lib/index.js";


console.log(Greeter("Lukas"));
console.log(HelloGreeter("Lukas"));
console.log("Example End");

let container;
let camera, scene, renderer;
let controller;

let isLoaded = false;
let reticle;
let mesh, model;

let hitTestSource = null;
let hitTestSourceRequested = false;

let setPos;

init();
animate();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 10 );
    light.position.set( 0.5, 1, 0.25 );
    scene.add( light );

    //

    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.xr.enabled = true;
    container.appendChild( renderer.domElement );

    //

    document.body.appendChild( ARButton.createButton( renderer, { requiredFeatures: [ 'hit-test' ] } ) );

    //

    const geometry = new THREE.CylinderGeometry( 0.1, 0.1, 0.2, 32 ).translate( 0, 0.1, 0 );

    function onSelect() {

        if ( reticle.visible ) {

            const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
            mesh = new THREE.Mesh( geometry, material );
            mesh.position.setFromMatrixPosition( reticle.matrix );
            mesh.scale.y = Math.random() * 2 + 1;
            //scene.add( mesh );

            setPos = mesh.position;

            if(isLoaded == true){
                model.position.set(setPos.x, setPos.y, setPos.z);
            }else{
                //load 3D object
                const loader = new GLTFLoader();

                loader.load( '../example-models/kickelhahn_tower/scene.gltf', function ( gltf ) {
                    //gltf.scene.position = setPos;
                    gltf.scene.scale.set(0.03, 0.03, 0.03);
                    scene.add( gltf.scene );
                    gltf.scene.position.set(setPos.x, setPos.y, setPos.z);
                    model = gltf.scene;
                    isLoaded = true;
                }, undefined, function ( error ) {
                    console.error( error );
                    window.alert(error);
                } );
            }
        }

    }

    controller = renderer.xr.getController( 0 );
    controller.addEventListener( 'select', onSelect );
    scene.add( controller );

    reticle = new THREE.Mesh(
        new THREE.RingGeometry( 0.15, 0.2, 32 ).rotateX( - Math.PI / 2 ),
        new THREE.MeshBasicMaterial()
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add( reticle );

    //

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

    renderer.setAnimationLoop( render );

}

function render( timestamp, frame ) {

    if ( frame ) {

        const referenceSpace = renderer.xr.getReferenceSpace();
        const session = renderer.xr.getSession();

        if ( hitTestSourceRequested === false ) {

            session.requestReferenceSpace( 'viewer' ).then( function ( referenceSpace ) {

                session.requestHitTestSource( { space: referenceSpace } ).then( function ( source ) {

                    hitTestSource = source;

                } );

            } );

            session.addEventListener( 'end', function () {

                hitTestSourceRequested = false;
                hitTestSource = null;

            } );

            hitTestSourceRequested = true;

        }

        if ( hitTestSource ) {

            const hitTestResults = frame.getHitTestResults( hitTestSource );

            if ( hitTestResults.length ) {

                const hit = hitTestResults[ 0 ];

                reticle.visible = true;
                reticle.matrix.fromArray( hit.getPose( referenceSpace ).transform.matrix );

            } else {

                reticle.visible = false;

            }

        }

    }

    renderer.render( scene, camera );

}
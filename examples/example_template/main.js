import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { ARButton } from 'https://unpkg.com/three@0.127.0/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';

//CONST
const USEAR = true;
const USEVR = false;

//global variables in main.js
let container;
//three.js global variables
let camera, scene, renderer;

//user global variables
let cube;

//function calls
init();

//function declaraions

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );

    addLighting(scene);

    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    if(USEAR) renderer.xr.enabled = true;
    if(USEVR) renderer.vr.enabled = true;

    renderer.setAnimationLoop(render);
    
    container.appendChild( renderer.domElement );

    document.body.appendChild( ARButton.createButton(renderer));

    setup();

    window.addEventListener( 'resize', onWindowResize );

}

function addLighting(scene) {
    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 10 );
    light.position.set( 0.5, 1, 0.25 );
    scene.add( light );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function render(time) {
    // Rotate the cube
    cube.rotation.y = time / 1000;
    // Draw everything
    renderer.render(scene, camera);
}

// user functions

function setup(){
    cube = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1,1,1),
        new THREE.MeshLambertMaterial({color:'red'})
    );
    cube.position.set(0, 1.5, -10);
    scene.add(cube);
}
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { HelloGreeter } from 'i5-tk-webxr';
import { Greeter } from 'i5-tk-webxr';
import { LoadingIndicator } from 'i5-tk-webxr';

console.log(HelloGreeter("Lukas") + " and " + Greeter("Lukas") );

//CONST
const USEAR = true;
const USEVR = false;

//global variables in main.js
let container;
//three.js global variables
let camera, scene, renderer;

//user global variables
let myLoadingIndicator;

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
    
    myLoadingIndicator.render(time);

    // Draw everything
    renderer.render(scene, camera);
}

// user functions

function setup(){
    myLoadingIndicator = new LoadingIndicator(0, 1.5, -10);
    myLoadingIndicator.addToScene(scene);
}
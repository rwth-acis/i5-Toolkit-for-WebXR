(function (THREE$1, ARButton_js, GLTFLoader_js, THREE) {
    'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var THREE__namespace$1 = /*#__PURE__*/_interopNamespace(THREE$1);
    var THREE__namespace = /*#__PURE__*/_interopNamespace(THREE);

    class LoadingIndicator {
        constructor(xPos, yPos, zPos) {
            this.xPos = xPos;
            this.yPos = yPos;
            this.zPos = zPos;
            this.cube = new THREE__namespace.Mesh(new THREE__namespace.BoxBufferGeometry(this.xPos, this.yPos, this.zPos), new THREE__namespace.MeshLambertMaterial({ color: 'red' }));
        }
        addToScene(scene) {
            this.cube.position.set(this.xPos, this.yPos, this.zPos);
            scene.add(this.cube);
        }
        render(time) {
            this.cube.rotation.y = time / 1000;
        }
    }

    //global variables in main.js
    let container;
    //three.js global variables
    let camera, scene, renderer;

    //user global variables
    let loadingIndicator;

    //function calls
    init();

    //function declaraions

    function init() {
        container = document.createElement( 'div' );
        document.body.appendChild( container );

        scene = new THREE__namespace$1.Scene();

        camera = new THREE__namespace$1.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );

        addLighting(scene);

        renderer = new THREE__namespace$1.WebGLRenderer( { antialias: true, alpha: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );

        renderer.xr.enabled = true;

        renderer.setAnimationLoop(render);
        
        container.appendChild( renderer.domElement );

        document.body.appendChild( ARButton_js.ARButton.createButton(renderer));

        setup();

        window.addEventListener( 'resize', onWindowResize );

    }

    function addLighting(scene) {
        const light = new THREE__namespace$1.HemisphereLight( 0xffffff, 0xbbbbff, 10 );
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
        //cube.rotation.y = time / 1000;
        loadingIndicator.render(time);
        // Draw everything
        renderer.render(scene, camera);
    }

    // user functions

    function setup(){
        // cube = new THREE.Mesh(
        //     new THREE.BoxBufferGeometry(1,1,1),
        //     new THREE.MeshLambertMaterial({color:'red'})
        // );
        // cube.position.set(0, 1.5, -10);
        // scene.add(cube);

        loadingIndicator = new LoadingIndicator(1, 1, 1);
        loadingIndicator.addToScene(scene);
    }

})(THREE$1, ARButton_js, null, THREE);

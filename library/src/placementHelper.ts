import * as THREE from 'three';

export class PlacementHelper{

    //threejs objects
    scene:THREE.Scene;
    renderer:any;
    controller:any;

    isLoaded = false;
    reticle:any;
    mesh:any;
    model:any;

    hitTestSource:any = null;
    hitTestSourceRequested:any = false;

    setPos:any;

    geometry:any = new THREE.CylinderGeometry( 0.1, 0.1, 0.2, 32 ).translate( 0, 0.1, 0 );;

    constructor(scene:THREE.Scene, renderer:any){
        this.scene = scene;
        this.renderer = renderer;

        //Create reticle
        this.reticle = new THREE.Mesh(
            new THREE.RingGeometry( 0.15, 0.2, 32 ).rotateX( - Math.PI / 2 ),
            new THREE.MeshBasicMaterial()
        );
        this.reticle.matrixAutoUpdate = false;
        this.reticle.visible = false;
        this.scene.add( this.reticle );

        //setup controller
        this.controller = renderer.xr.getController( 0 );
        this.controller.addEventListener( 'select', this.onSelect.bind(this) );
        scene.add( this.controller );

    }

    onSelect(){
        //if ( this.reticle.visible ) {
        console.log(this);
        console.log(this.reticle);
        if ( true ) {

            const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
            this.mesh = new THREE.Mesh( this.geometry, material );
            this.mesh.position.setFromMatrixPosition( this.reticle.matrix );
            this.mesh.scale.y = Math.random() * 2 + 1;
            this.scene.add( this.mesh );

            // this.setPos = this.mesh.position;

            // if(isLoaded == true){
            //     model.position.set(setPos.x, setPos.y, setPos.z);
            // }else{
            //     //load 3D object
            //     const loader = new GLTFLoader();

            //     loader.load( './data/kickelhahn_tower/scene.gltf', function ( gltf ) {
            //         //gltf.scene.position = setPos;
            //         gltf.scene.scale.set(0.03, 0.03, 0.03);
            //         scene.add( gltf.scene );
            //         gltf.scene.position.set(setPos.x, setPos.y, setPos.z);
            //         model = gltf.scene;
            //         isLoaded = true;
            //     }, undefined, function ( error ) {
            //         console.error( error );
            //         window.alert(error);
            //     } );
            // }
        }
    }

    render( timestamp:number, frame:any){
        if ( frame ) {

            const referenceSpace = this.renderer.xr.getReferenceSpace();
            const session = this.renderer.xr.getSession();

            if ( this.hitTestSourceRequested === false ) {

                session.requestReferenceSpace( 'viewer' ).then( ( referenceSpace:any ) => {

                    session.requestHitTestSource( { space: referenceSpace } ).then( ( source:any ) => {

                        this.hitTestSource = source;

                    } );

                } );

                session.addEventListener( 'end',  () => {

                    this.hitTestSourceRequested = false;
                    this.hitTestSource = null;

                } );

                this.hitTestSourceRequested = true;

            }

            if ( this.hitTestSource ) {

                const hitTestResults = frame.getHitTestResults( this.hitTestSource );

                if ( hitTestResults.length ) {

                    const hit = hitTestResults[ 0 ];

                    this.reticle.visible = true;
                    this.reticle.matrix.fromArray( hit.getPose( referenceSpace ).transform.matrix );

                } else {

                    this.reticle.visible = false;

                }

            }

        }
    }
}
import * as THREE from 'three';

export class BoundaryBox{

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
    obj:any;

    editmode:boolean;

    constructor(scene:THREE.Scene, renderer:any, obj:any){
        this.scene = scene;
        this.renderer = renderer;
        this.obj = obj;
        this.editmode = true;

        //add event listenier to obj
        //XXX

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

    addBoundingBoxToObj(obj:any){
        this.obj = obj;
    }

    removeBoundingBoxFromObj(obj:any){
        //ToDo
    }

    onSelect(){
        if(this.editmode){
            this.reticle.visible = false;
            this.editmode = false;
        }else{
            this.reticle.visible = true;
            this.editmode = true;
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

                    if(this.editmode){
                        this.reticle.visible = true;
                        this.reticle.matrix.fromArray( hit.getPose( referenceSpace ).transform.matrix );

                        //if follow Mode move obj along
                        this.obj.position.setFromMatrixPosition( this.reticle.matrix );
                    }
                    

                } else {

                    this.reticle.visible = false;

                }

            }

        }
    }
}
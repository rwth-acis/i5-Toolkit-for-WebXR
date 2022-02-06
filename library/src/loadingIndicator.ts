import * as THREE from 'three';

export class LoadingIndicator{
    xPos: number;
    yPos: number;
    zPos: number;
    scale: number;
    cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
    constructor(xPos: number, yPos: number, zPos: number, scale: number){
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
        this.scale = scale;

        this.cube = new THREE.Mesh(
            new THREE.BoxBufferGeometry(scale, scale, scale),
            new THREE.MeshLambertMaterial({color:'red'})
        );
    }

    addToScene(scene: THREE.Scene){
        this.cube.position.set(this.xPos, this.yPos, this.zPos);
        scene.add(this.cube);
    }

    render(time: number){
        this.cube.rotation.y = time / 1000;
    }
}
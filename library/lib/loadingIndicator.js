import * as THREE from 'three';
export class LoadingIndicator {
    constructor(xPos, yPos, zPos, scale = 1, material = new THREE.MeshLambertMaterial({ color: 'white' })) {
        this.color = 'white';
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
        this.scale = scale;
        this.group = new THREE.Group();
        this.cubes = new Array(8);
        for (var i = 0; i < 8; i++) {
            this.cubes[i] = new THREE.Mesh(new THREE.BoxBufferGeometry(0.25 * scale, 0.25 * scale, 0.25 * scale), material);
        }
        //set cube location with applyMatrix to be able to rotate group in place.
        let offset = 0.25 * this.scale;
        this.cubes[0].applyMatrix4(new THREE.Matrix4().makeTranslation(offset, offset, offset));
        this.cubes[1].applyMatrix4(new THREE.Matrix4().makeTranslation(offset, offset, -offset));
        this.cubes[2].applyMatrix4(new THREE.Matrix4().makeTranslation(offset, -offset, offset));
        this.cubes[3].applyMatrix4(new THREE.Matrix4().makeTranslation(offset, -offset, -offset));
        this.cubes[4].applyMatrix4(new THREE.Matrix4().makeTranslation(-offset, offset, offset));
        this.cubes[5].applyMatrix4(new THREE.Matrix4().makeTranslation(-offset, offset, -offset));
        this.cubes[6].applyMatrix4(new THREE.Matrix4().makeTranslation(-offset, -offset, offset));
        this.cubes[7].applyMatrix4(new THREE.Matrix4().makeTranslation(-offset, -offset, -offset));
        for (var i = 0; i < 8; i++) {
            this.group.add(this.cubes[i]);
        }
    }
    addToScene(scene) {
        this.group.applyMatrix4(new THREE.Matrix4().makeTranslation(this.xPos, this.yPos, this.zPos));
        scene.add(this.group);
    }
    render(time) {
        //this.cubes[0].rotation.y = time / 1000;
        //this.group.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI/2000);
        this.group.rotateY(Math.PI / 400);
        this.group.rotateX(Math.PI / 400);
    }
}

import * as THREE from 'three';
export declare class LoadingIndicator {
    xPos: number;
    yPos: number;
    zPos: number;
    scale: number;
    color: string;
    cubes: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>[];
    group: THREE.Group;
    constructor(xPos: number, yPos: number, zPos: number, scale?: number, material?: THREE.MeshLambertMaterial);
    addToScene(scene: THREE.Scene): void;
    render(time: number): void;
}

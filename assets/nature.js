import * as THREE from 'three';

const bigTree = ({w,h,d}, hex, position = {x: 0, y: 0, z: 0}) => {
    const geometry = new THREE.BoxGeometry( w, h, d );
    const material = new THREE.MeshBasicMaterial( { color: Number("0x"+hex) } );
    const obj = new THREE.Mesh( geometry, material );
    obj.position.set(position.x, position.y, position.z);
    return obj;
}

export {bigTree}
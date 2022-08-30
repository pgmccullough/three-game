import "./styles/main.sass";

import { bigTree } from "./assets/nature";

import * as THREE from 'three';

const map1 = [
  {object: bigTree, dimensions: {w: 1, h: 4, d: 1}, hex: "964B00", position: {x: 0, y: 0, z: 0}},
  {object: bigTree, dimensions: {w: 1, h: 4, d: 1}, hex: "964B00", position: {x: 1, y: 0, z: -4}},
  {object: bigTree, dimensions: {w: 1, h: 4, d: 1}, hex: "964B00", position: {x: 3, y: 0, z: -5}},
  {object: bigTree, dimensions: {w: 1, h: 4, d: 1}, hex: "964B00", position: {x: 5, y: 0, z: -5}},
  {object: bigTree, dimensions: {w: 1, h: 4, d: 1}, hex: "964B00", position: {x: 2, y: 0, z: -8}},
]

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xADD8E6 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

map1.forEach(({ object, dimensions, hex, position }) =>
  scene.add(object(dimensions,hex,position))
)

var geometry = new THREE.PlaneGeometry( 1000, 1000, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
var floor = new THREE.Mesh( geometry, material );
floor.material.side = THREE.DoubleSide;
floor.rotateX( - Math.PI / 1.99);
scene.add( floor );

camera.position.y = 1;
camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

const stepBounce = () => {
  for(let i = 1; i < 9; i++) {
    if(i<5) {
      setTimeout(() => {
        camera.position.y += .01;
      },i*30);
    } else {
      setTimeout(() => {
        camera.position.y -= .01;
      },i*30);    
    }
  }
}

const moveForward = () => {
  camera.position.z -= 0.2;
  stepBounce();
}

const moveBackward = () => {
  camera.position.z += 0.2;
  stepBounce();
}

const moveRight = () => {
  camera.position.x += 0.2;
  stepBounce();
}

const moveLeft = () => {
  camera.position.x -= 0.2;
  stepBounce();
}

let pauseMove = 0;

let winX = window.innerWidth/2;
let winXRatio = 100/winX;
let winY = window.innerHeight/2;
let winYRatio = 100/winY;

window.onmousemove = e => {
  let relX = ((Number(winX)-Number(e.clientX))*-1)*winXRatio;
  let relY = ((Number(winY)-Number(e.clientY))*-1)*winYRatio;
  console.log(relX, relY);
  camera.lookAt(6*(relX/100),(6*(relY/100))*-1,0);
}

document.onkeydown = e => {
  e.preventDefault();
  console.log(e.code)
  if(!pauseMove) {
    pauseMove = 1;
    e.code==="KeyW"?moveForward():"";
    e.code==="KeyS"?moveBackward():"";
    e.code==="KeyD"?moveRight():"";
    e.code==="KeyA"?moveLeft():"";
    setTimeout(() => {pauseMove = 0}, 300);
  }
}
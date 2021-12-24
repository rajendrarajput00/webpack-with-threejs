//import './style.css'
import * as THREE from 'three';

//Scene
const scene = new THREE.Scene();

//Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const mesh = new THREE.Mesh(geometry, material);
//mesh.position.set(0.7, -0.6, 1);
mesh.position.normalize();
console.log(mesh.position.length());
/* mesh.position.y = 2
mesh.position.x = 3
mesh.position.z = 2 */



scene.add(mesh)
//Axes Helper
const AxesHelper = new THREE.AxesHelper(3);
scene.add(AxesHelper)

//Sizes
const sizes = {
    width: 800,
    height: 600
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
/* camera.position.y = 2;
camera.position.x =1; */


scene.add(camera)

//Renderer
const canvas = document.querySelector('.webgl');
console.log(canvas);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera)

let preTime = Date.now()

//Clock
const clock = new THREE.Clock();
 console.log('Clock ',clock);

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    console.log('elapsedTime',elapsedTime);
    let currTime = Date.now()
    const deltaTime = currTime  - preTime;
    preTime = currTime
    //console.log('dd',deltaTime);
    mesh.rotation.y += 0.001 * deltaTime
    // mesh.rotation.y += 0.01
    /* camera.position.x = 0.01
    mesh.rotation.z += 0.01
    camera.rotation.z += 0.01 */
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
//tick() 

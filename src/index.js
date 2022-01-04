import './style.css'
import * as THREE from 'three';
import Gasp from './components/Gasp'
import TimeCalculation from './components/TimeCalulation';
import PerspectiveCamera from './components/Camera/PerspectiveCamera';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import BufferGeometry from './components/Geometry/BufferGeometry';
import BoxGeometry from './components/Geometry/BoxGeometry';
//Scene
const scene = new THREE.Scene();



//draw 50 trinagle
const geometry = BufferGeometry();
//Red cube
//const geometry =BoxGeometry()

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
});

const mesh = new THREE.Mesh(geometry, material);
//mesh.position.set(0.7, -0.6, 1);
mesh.position.normalize();
/* mesh.position.y = 2
mesh.position.x = 3
mesh.position.z = 2 */



scene.add(mesh)
//Axes Helper
//const AxesHelper = new THREE.AxesHelper(3);
//scene.add(AxesHelper)

//Cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {

    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);
    // console.log(event.clientX,event.clientY);
})

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    //Update Sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    //Update Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})

//Camera
let camera = PerspectiveCamera(mesh)
scene.add(camera)

//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera);

//Gasp(mesh)

// Controls
const controls = new OrbitControls(camera, canvas);
//controls.enabled=false;
//controls.target.x =1;
//controls.enableDamping = true
// controls.update()

//TimeCalculation Operations.
const tick = () => {
    // TimeCalculation(mesh, camera, renderer, scene, tick)

    /* camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
    camera.position.y = Math.sin(cursor.x * Math.PI * 2) * 2;
    camera.position.x = cursor.y * 3

    camera.lookAt(mesh.position) */

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

}
tick()

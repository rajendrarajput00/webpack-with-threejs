import './style.css'
import * as THREE from 'three';
import Gasp from './components/Gasp'
import gsap from 'gsap';
import TimeCalculation from './components/TimeCalulation';
import PerspectiveCamera from './components/Camera/PerspectiveCamera';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//Geometry
import BufferGeometry from './components/Geometry/BufferGeometry';
import BoxGeometry from './components/Geometry/BoxGeometry';

import colorTexture from '../static/color.jpg'
import alphaTexture from '../static/alpha.jpg'
import ambidentTexture from '../static/ambientOcclusion.jpg'
import heightTexture from '../static/height.png'
import mtalTexture from '../static/metalness.jpg'
import normalTexture from '../static/normal.jpg'
import roughnesTexture from '../static/roughness.jpg'



//Debug
import DatGui from './components/debug/DatGui'
//Scene
const scene = new THREE.Scene();


/* Textures */
/* const texture = new THREE.Texture(Ima)

const image = new Image();
image.onload = () => {
    texture.needsUpdate = true;
}
image.src =  Ima */
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
    console.log('start');
}
loadingManager.onLoad = () => {
    console.log('onloaded');
}
loadingManager.onProgress = () => {
    console.log('onprogree');
}
loadingManager.onError = () => {
    console.log('error');
}

const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load(colorTexture)

texture.minFilter = THREE.NearestFilter;
//texture.magFilter = THREE.NearestFilter;


/* const texture = textureLoader.load(Ima,
    () => {
        console.log('load');
    },
    () => {
        console.log('progress');
    },
    () => {
        console.log('error');
    }
) */

/* texture.repeat.x =2
texture.repeat.y =3
texture.wrapS = THREE.MirroredRepeatWrapping;
texture.wrapT = THREE.MirroredRepeatWrapping;

texture.offset.x = 0.5
texture.offset.y = 0.5 */
texture.rotation = Math.PI * 2
texture.center.x = 0.5
texture.center.y = 0.5




//For Debug     
const gui = DatGui;

//draw 50 trinagle
//const geometry = BufferGeometry();
//Red cube
const geometry = BoxGeometry()

const parameters = {
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 })
    }
}

/* Lights Start */
const ambidentLigh = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambidentLigh);

gui.add(ambidentLigh,'intensity').min(0).max(1).step(0.01);
/*Light End  */

//const material = new THREE.MeshBasicMaterial({ map: texture });

const material = new THREE.MeshStandardMaterial();

material.roughness = 0.4;

const directionalLight = new THREE.DirectionalLight(0x00fffc,0.5);
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xff00000,0x0000ff,0.3);
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xff9000,0.5);
pointLight.position.set(1,-0.5,1)
scene.add(pointLight);

const mesh = new THREE.Mesh(geometry, material);

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16),
    material
)
sphere.position.x = -1.5
const plane_one = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1),
    material
)


const tours = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
    material

)
tours.position.x = 1.5;
//mesh.position.set(0.7, -0.6, 1);
mesh.position.normalize();
/* mesh.position.y = 2
mesh.position.x = 3
mesh.position.z = 2 */



scene.add(mesh, sphere, plane_one, tours)

//Debug


gui
    .addColor(parameters, 'color')
    .onChange(() => {
        material.color.set(parameters.color)
    })
gui
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('meshName')

gui
    .add(mesh, 'visible')

gui
    .add(material, 'wireframe')

gui
    .add(parameters, 'spin')



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

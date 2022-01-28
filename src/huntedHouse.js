import * as THREE from 'three'
import { GreaterDepth } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
/* For Debug */
import DatGui from './components/debug/DatGui';
import doorTexture from '../static/color.jpg';
import alphaTextue from '../static/alpha.jpg';
import ambidentTexture from '../static/ambientOcclusion.jpg';
import heightTexture from '../static/height.png';
import normalTexture from '../static/normal.jpg';
import metalnessTexture from '../static/metalness.jpg';
import roughnessTexture from '../static/roughness.jpg';

import colorTextures from '../static/textures/bricks/normalbricks.jpg'
import ambidentTextures from '../static/textures/bricks/ambientOcclusionbricks.jpg'
import normalTextures from '../static/textures/bricks/normalbricks.jpg'
import roughnessTextures from '../static/textures/bricks/roughnessbricks.jpg'

import grasscolorTextures from '../static/textures/grass/colorgrass.jpg'
import grassambidentTextures from '../static/textures/grass/ambientOcclusiongrass.jpg'
import grassnormalTextures from '../static/textures/grass/normalgrass.jpg'
import grassroughnessTextures from '../static/textures/grass/roughnessgrass.jpg'






const gui = DatGui;
//Canvas
const canvas = document.querySelector('canvas.webgl');
//Scene 
const scene = new THREE.Scene();

//Fog
const fog = new THREE.Fog('#262837', 1, 15);
scene.fog = fog;

/* 
* Texture
 */

const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load(doorTexture);
const doorAlphaTexture = textureLoader.load(alphaTextue);
const doorAmbidentTexture = textureLoader.load(ambidentTexture);
const doorHeightexture = textureLoader.load(heightTexture);
const doorNormalTexture = textureLoader.load(normalTexture);
const doorMetalnessTexture = textureLoader.load(metalnessTexture);
const doorRoughnessTexture = textureLoader.load(roughnessTexture);


const bricksColorTexture = textureLoader.load(colorTextures);
const bricksAmbidentTexture = textureLoader.load(ambidentTextures);
const bricksNormalTexture = textureLoader.load(normalTextures);
const bricksRoughnessTexture = textureLoader.load(roughnessTextures);

const grassColorTexture = textureLoader.load(grasscolorTextures);
const grassAmbidentTexture = textureLoader.load(grassambidentTextures);
const grassNormalTexture = textureLoader.load(grassnormalTextures);
const grassRoughnessTexture = textureLoader.load(grassroughnessTextures);


grassColorTexture.repeat.set(8, 8)
grassAmbidentTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)


grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbidentTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbidentTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping


/**
 *  House
 */
//Group
const house = new THREE.Group();
scene.add(house)

//Walls
const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbidentTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture

    })
)
walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)
walls.position.y = 1.25
house.add(walls)

//Roof
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
)
roof.position.y = 2.5 + 0.5;
roof.rotation.y = Math.PI / 4;
house.add(roof)

//Door
const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbidentTexture,
        displacementMap: doorHeightexture,
        // wireframe:true,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture

    })
)
door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)
door.position.y = 1
door.position.z = 2 + 0.01;
house.add(door)


//Bushes
const busGeometry = new THREE.SphereBufferGeometry(1, 16, 16);
const busMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });


const bush1 = new THREE.Mesh(busGeometry, busMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(busGeometry, busMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);


const bush3 = new THREE.Mesh(busGeometry, busMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(busGeometry, busMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4)

//Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

for (let i = 0; i < 50; i++) {

    const angel = Math.random() * Math.PI * 2;
    const radius = 6 + Math.random() * 3;
    const x = Math.sin(angel) * radius;
    const z = Math.cos(angel) * radius;
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.set(x, 0.4, z)
    grave.castShadow = true
    graves.add(grave)

}





/* Objects */
//Material
const material = new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbidentTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture
});
material.roughness = 0.04;

const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 20),
    material
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = - 0
floor.receiveShadow = true;
floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)
scene.add(floor);

/* Lights Start */
const ambidentLigh = new THREE.AmbientLight('0b9d5ff', 0.12);
scene.add(ambidentLigh);
gui.add(ambidentLigh, 'intensity').min(0).max(1).step(0.001);

const directionalLight = new THREE.DirectionalLight('0b9d5ff', 0.12);
directionalLight.position.set(4, 5, -2)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001);
gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001);

directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.far = 15

scene.add(directionalLight);
directionalLight.castShadow = true;

/* directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.mapSize.near = 1024;
directionalLight.shadow.mapSize.far = 1024; */

//Door light

const pointLight = new THREE.PointLight('#ff7d46', 1, 7);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 256
pointLight.shadow.mapSize.height = 256
pointLight.shadow.camera.far = 7
pointLight.position.set(1, 2.2, 2.7)
scene.add(pointLight);

/* const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(pointLightCameraHelper) */


/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
scene.add(ghost3)

ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

// ...

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

// ...

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7

/*Light End  */





/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;
renderer.setClearColor('#262837')

const clock = new THREE.Clock()
const tick = () => {


    const elapsedTime = clock.getElapsedTime()

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = - elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = - elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
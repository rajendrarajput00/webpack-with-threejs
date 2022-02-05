import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


/* 
* Base
 */

//Debug

const gui = new dat.GUI();

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
//Canvas

const canvas = document.querySelector('canvas.webgl');

//Scene

const scene = new THREE.Scene();

/* Design Cube */

/* const cube = new THREE.Mesh(
   new THREE.BoxBufferGeometry(1,1,1),
   new THREE.MeshBasicMaterial()
)

scene.add(cube); */

const parameter = {};
parameter.count = 10000;
parameter.size = 0.01;
parameter.radius = 5;
parameter.branches = 3;
parameter.spin = 1,
    parameter.randomness = 0.2,
    parameter.insideColor = '#ff6030'
parameter.outsideColor = '#1b3984'


/* Galaxy */

let geometry = null
let material = null
let points = null
const positions = new Float32Array(parameter.count * 3);
const colors = new Float32Array(parameter.count * 3);

const colorInside = new THREE.Color(parameter.insideColor)
const colorOutside = new THREE.Color(parameter.outsideColor)


const generateGalaxy = () => {

    if (points !== null) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    geometry = new THREE.BufferGeometry();



    for (let i = 0; i < parameter.count; i++) {


        const i3 = i * 3

        const radius = Math.random() * parameter.radius;
        const spinAngel = radius * parameter.spin
        const branchAngle = (i % parameter.branches) / parameter.branches * Math.PI * 2

        const randomX = (Math.random() - 0.5) * parameter.randomness * radius
        const randomY = (Math.random() - 0.5) * parameter.randomness * radius
        const randomZ = (Math.random() - 0.5) * parameter.randomness * radius

        positions[i3] = Math.cos(branchAngle + spinAngel) * radius + randomX;//(Math.random() - 0.5) * 3
        positions[i3 + 1] = randomY;//(Math.random() - 0.5) * 3
        positions[i3 + 2] = Math.sin(branchAngle + spinAngel) * radius + randomZ//(Math.random() - 0.5) * 3

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameter.radius)

        colors[i3] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    /* Material */

    material = new THREE.PointsMaterial(
        {
            size: parameter.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
           /// color: '#ff5588'
           vertexColors:true
        })
    /* Points */
    points = new THREE.Points(geometry, material)
    scene.add(points)

}
generateGalaxy();
gui.add(parameter, 'count').min(100).max(100000).step(100).onFinishChange(generateGalaxy);
gui.add(parameter, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy);
gui.add(parameter, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy);
gui.add(parameter, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy);
gui.add(parameter, 'spin').min(- 5).max(5).step(0.001).onFinishChange(generateGalaxy);
gui.add(parameter, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy);
gui.addColor(parameter, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameter, 'outsideColor').onFinishChange(generateGalaxy)



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

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/* Rendere */

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const clock = new THREE.Clock()
const tick = () => {


    const elapsedTime = clock.getElapsedTime()
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



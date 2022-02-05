import * as THREE from 'three';
import * as dat from 'dat.gui';
import './style.css'

/**
 * Debug
 */
const gui = new dat.GUI();

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() =>
    {
        material.color.set(parameters.materialColor)
    })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');
// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// Texture
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('/assets/images/3.jpg');
gradientTexture.magFilter = THREE.NearestFilter
// Material
const material = new THREE.MeshToonMaterial({ 
    color: parameters.materialColor,
    gradientMap: gradientTexture
 })

// Meshes
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
)
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
)
const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)

const objectsDistance = 4

mesh1.position.y = - objectsDistance * 0
mesh2.position.y = - objectsDistance * 1
mesh3.position.y = - objectsDistance * 2
/* 
mesh1.position.y = 2
mesh1.scale.set(0.5, 0.5, 0.5)

mesh2.visible = false

mesh3.position.y = - 2
mesh3.scale.set(0.5, 0.5, 0.5) */

scene.add(mesh1, mesh2, mesh3)


/**
 * Lights
 */
 const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
 directionalLight.position.set(1, 1, 0)
 scene.add(directionalLight)


/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



/**
 * Scroll
 */
 let scrollY = window.scrollY

 window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY

    console.log(scrollY)
})

/**
 * Cursor
 */
 const cursor = {}
 cursor.x = 0
 cursor.y = 0


 window.addEventListener('mousemove', (event) =>
 {
     cursor.x = event.clientX / sizes.width - 0.5
     cursor.y = event.clientY / sizes.height - 0.5
 
     console.log(cursor)
 })
/**
 * Animate
 */
const clock = new THREE.Clock();
const sectionMeshes = [ mesh1, mesh2, mesh3 ]

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    for(const mesh of sectionMeshes)
    {
        mesh.rotation.x = elapsedTime * 0.1
        mesh.rotation.y = elapsedTime * 0.12
    }

    // Animate camera
    camera.position.y = - scrollY / sizes.height * objectsDistance

    const parallaxX = cursor.x
    const parallaxY = - cursor.y
    camera.position.x = parallaxX
    camera.position.y = parallaxY
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()




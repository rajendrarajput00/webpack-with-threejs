
import * as THREE from 'three';


let preTime = Date.now()
//Clock
const clock = new THREE.Clock();

const TimeCalculation = (mesh,camera,renderer,scene,tick) => {

    const elapsedTime = clock.getElapsedTime();
    let currTime = Date.now()
    const deltaTime = currTime - preTime;
    preTime = currTime
    //console.log('dd',deltaTime);
    mesh.rotation.y += 0.001 * deltaTime
    // mesh.rotation.y += 0.01
    /* camera.position.x = 0.01
    mesh.rotation.z += 0.01
    camera.rotation.z += 0.01 */
    /* renderer.render(scene, camera)
    window.requestAnimationFrame(tick) */

}

export default TimeCalculation;
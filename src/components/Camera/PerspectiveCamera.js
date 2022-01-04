import * as THREE from 'three';

const sizes = {
    width: 800,
    height: 600
}
const PerspectiveCamera = (mesh) => {
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    /* const camera = new THREE.OrthographicCamera(
        -1,
        1,
        1,
        -1,
        0.1,
        100); */
    camera.position.x = 2;
    camera.position.y = 1;
    camera.position.z = 2;
    camera.lookAt(mesh.position)
    return camera;
}

export default PerspectiveCamera;
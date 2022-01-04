import * as THREE from 'three';


const BufferGeometry = () => {

    const geometry = new THREE.BufferGeometry();
    const count = 50;
    //Draw single trinagle
    /*   const positionArray = new Float32Array([
          0, 0, 0,
          0, 1, 0,
          1, 0, 0
      ]); */

    const positionArray = new Float32Array(count * 3 * 3);

    for (let i = 0; i < count * 3 * 3; i++) {
        positionArray[i] = Math.random() - 0.5;
    }

    const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
    geometry.setAttribute('position', positionAttribute)

    return geometry;

}

export default BufferGeometry;
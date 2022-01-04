import gsap from "gsap"



function Gasp(mesh) {
    gsap.to(mesh.position, { duration: 1, delay: 1, y: 1 })
    gsap.to(mesh.position, { duration: 1, delay: 2, x: -2 })


}

export default Gasp;
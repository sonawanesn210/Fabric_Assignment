import * as THREE from '/build/three.module.js';
//console.log(THREE)
 
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js'
//console.log(GLTFLoader)

import { OrbitControls } from './jsm/controls/OrbitControls.js';
console.log(OrbitControls)


let scene;
let camera;
let renderer;
let house;
let model_container = document.querySelector('.web-gl');

const init = () => {
    // scene setup
    scene = new THREE.Scene();
    //console.log(scene)
    const fov = 40;
    const aspect = window.innerWidth/window.innerHeight
   // const aspect = canvasSize.offsetWidth / canvasSize.offsetHeight;
    const near =1;
    const far =1000
    camera = new THREE.PerspectiveCamera(fov,aspect,near,far)
    camera.position.set(0,0,4)
    scene.add(camera)

    renderer =new THREE.WebGLRenderer({
        antialias:true,
        canvas:model_container

    })
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.setPixelRatio((window.devicePixelRatio)? window.devicePixelRatio:1)
    renderer.autoClear=false;
    renderer.setClearColor(0x000000, 0.0)
    

    const controls =new OrbitControls(camera,renderer.domElement)
    const amibientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(amibientLight);

    const loader = new GLTFLoader()
    loader.load("./model/scene.glb",(gltf)=>{
        house=gltf.scene.children[0];
       /*  house.scale.set(3,10,10)
        house.position.set(0,-1.3,0) */
     //   house.rotation.x=Math.PI/-3
        scene.add(gltf.scene)

    })
  animate()
}
const render = () => {
    renderer.render(scene, camera);
}

const  animate =()=>{
    requestAnimationFrame(animate)
    render()
}
//for responsive website
const windowResize =()=>{
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth,window.innerHeight)
    render()
     
}
window.addEventListener('resize',windowResize,false)
window.onload=init
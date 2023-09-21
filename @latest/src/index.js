import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 3);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('mainC')});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000);
document.body.appendChild( renderer.domElement );

const [textures, materials, cubes, statics] = [[], [], [], ["../public/ca39.png", "../public/ca35.png", "../public/ca37.png",]];
const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );

for (let i = 0; i < statics.length; i++) {
	const texture = new THREE.TextureLoader().load(statics[i]);
  	textures.push(texture);
	const material = new THREE.MeshMatcapMaterial({map: textures[i]});
	materials.push(material);
	const cube = new THREE.Mesh(boxGeometry, materials[i]);
	cubes.push(cube);
	scene.add(cubes[i]);
}

cubes[1].position.x = -2;
cubes[2].position.x = 2;

function animate() {
	requestAnimationFrame( animate );
    cubes[0].rotation.x += 0.01;
    cubes[0].rotation.y += 0.01;
	cubes[1].rotation.x += 0.01;
    cubes[1].rotation.y += 0.01;
	cubes[2].rotation.x += 0.01;
    cubes[2].rotation.y += 0.01;
	renderer.render( scene, camera );
	// yeah ill optimize this later lolololol
}

if ( WebGL.isWebGLAvailable() ) {
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'warningContainer' ).appendChild( warning );

}

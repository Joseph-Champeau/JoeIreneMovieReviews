import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';


// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Wood texture
const woodTexture = new THREE.TextureLoader().load('/wood_texture.jpg');

//Anora Poster
const anoraPoster = new THREE.TextureLoader().load('/anora_poster.jpg');

//Didi Poster
const didiPoster = new THREE.TextureLoader().load('/didi.jpg');

//Shelf Object
const shelfShape = new THREE.BoxGeometry(11, 0.1, 4);
const shelfMaterial = new THREE.MeshBasicMaterial({ 
  map: woodTexture 
} );
const shelf = new THREE.Mesh(shelfShape, shelfMaterial);
scene.add(shelf);

//Anora CDbox
const anoraShape = new THREE.BoxGeometry(0.5, 3, 4);
const anoraMaterial = [
  new THREE.MeshBasicMaterial( { map: anoraPoster } ),
  new THREE.MeshBasicMaterial( { color: 'lightgray'}),
  new THREE.MeshBasicMaterial( { color: 'lightgray'}),
  new THREE.MeshBasicMaterial( { color: 'lightgray'}),
  new THREE.MeshBasicMaterial( { color: 'lightgray'}),
  new THREE.MeshBasicMaterial( { color: 'lightgray'})
]
const anora = new THREE.Mesh(anoraShape, anoraMaterial)
anora.translateY(1.54)
scene.add(anora)

//Didi CBbox
const didiShape = new THREE.BoxGeometry(0.5, 3, 4);
const didiMaterial = [
  new THREE.MeshBasicMaterial( { map: didiPoster } ),
  new THREE.MeshBasicMaterial( { color: 'lightgray'}),
  new THREE.MeshBasicMaterial( { color: 'lightgray'}),
  new THREE.MeshBasicMaterial( { color: 'lightgray'}),
  new THREE.MeshBasicMaterial( { color: 'lightgray'}),
  new THREE.MeshBasicMaterial( { color: 'lightgray'})
]
const didi = new THREE.Mesh(didiShape, didiMaterial)
didi.translateY(1.54)
didi.translateX(-1)
scene.add(didi)

// Set initial camera position
camera.position.z = 5;
camera.position.y = 1;
camera.position.x = 1;

// Handle window resizing
window.addEventListener( "resize", (event) => {
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix( );
  renderer.setSize( innerWidth, innerHeight );
});

var ambientLight = new THREE.AmbientLight( 'white', 0.5 );
    scene.add( ambientLight );

var light = new THREE.DirectionalLight( 'white', 0.5 );
    light.position.set( 1, 1, 1 );
    scene.add( light );

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();

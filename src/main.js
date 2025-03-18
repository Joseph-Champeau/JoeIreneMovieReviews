import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Movie from './Movie.js';  // Import the Movie class from the Movie.js file


// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color('white')


// CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// Position Camera
camera.position.set(0, 10, 20);
camera.lookAt(new THREE.Vector3(0, 20, 0));


// RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// AXESHELPER
const axesHelper = new THREE.AxesHelper( 50 );
scene.add( axesHelper );

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 10, 0);
controls.update();

// RAYCASTER
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// FLOOR
const plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshPhongMaterial({ color: 0x0a7d15 }));
plane.rotation.x = 3 * Math.PI / 2
plane.receiveShadow = true;
plane.translateZ(-.5)
scene.add(plane)

// ATMOSPHERE LIGHT
scene.add(new THREE.AmbientLight(0xffffff, 0.5))

//Wood texture
const woodTexture = new THREE.TextureLoader().load('/wood_texture.jpg');

//Shelf Object
// const shelfBacking = new THREE.BoxGeometry();
const shelfShape = new THREE.BoxGeometry(20, 1, 4);
const shelfMaterial = new THREE.MeshBasicMaterial({ 
  map: woodTexture 
} );

const shelf1 = new THREE.Mesh(shelfShape, shelfMaterial);
scene.add(shelf1);

const shelf2 = new THREE.Mesh(shelfShape, shelfMaterial);
shelf2.translateY(10);
scene.add(shelf2);

const shelf3 = new THREE.Mesh(shelfShape, shelfMaterial);
shelf3.translateY(20);
scene.add(shelf3);

const shelf4 = new THREE.Mesh(shelfShape, shelfMaterial);
shelf4.translateY(30);
scene.add(shelf4);

const shelf5 = new THREE.Mesh(shelfShape, shelfMaterial);
shelf5.translateY(40);
scene.add(shelf5);


// Create movie instances
const anora = new Movie('Anora', '/anora_poster.jpg', 'Arial', 'lightgray', new THREE.Vector3(0, 3.5, 0), new THREE.Vector3(0, 3.5, 10));
const didi = new Movie('Didi', '/didi_poster.jpg', 'Arial', 'lightgray', new THREE.Vector3(-2, 3.5, 0), new THREE.Vector3(-2, 3.5, 10));

scene.add(anora.movieObject);
scene.add(didi.movieObject);


// MOUSE MOVE EVENT
window.addEventListener('mousemove', (event) => {
  // Normalize mouse coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Handle window resizing
window.addEventListener( "resize", (event) => {
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( innerWidth, innerHeight );
});


// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update the raycaster with the new mouse coordinates
  raycaster.setFromCamera(mouse, camera);

  // Get the intersected objects (all movie objects)
  const intersects = raycaster.intersectObjects([anora.movieObject, didi.movieObject]);

  // Check if the mouse is hovering over any movie object
  if (intersects.length > 0) {
    const hoveredMovie = intersects[0].object;
    
    // Start moving the hovered movie to the end position
    if (hoveredMovie === anora.movieObject) {
      anora.moveToEndPosition();
    } else {
      anora.moveToStartPosition();
    }
    if (hoveredMovie === didi.movieObject) {
      didi.moveToEndPosition();
    } else {
      didi.moveToStartPosition();
    }
  } else {
    // If the mouse is not hovering over any movie object, reset them
    anora.moveToStartPosition();
    didi.moveToStartPosition();
  }

  // Update each movie object (move and rotate)
  anora.update();
  didi.update();

  renderer.render(scene, camera);
}

animate();
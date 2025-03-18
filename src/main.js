import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Movie from './Movie.js';  // Import the Movie class from the Movie.js file

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color('white');

// CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20);
camera.lookAt(new THREE.Vector3(0, 20, 0));

// RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// AXESHELPER
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 10, 0);
controls.update();

// RAYCASTER
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// FLOOR
const plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshPhongMaterial({ color: 0x0a7d15 }));
plane.rotation.x = 3 * Math.PI / 2;
plane.receiveShadow = true;
plane.translateZ(-0.5);
scene.add(plane);

// ATMOSPHERE LIGHT
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// Wood texture
const woodTexture = new THREE.TextureLoader().load('/wood_texture.jpg');

// Shelf Object
const shelfShape = new THREE.BoxGeometry(20, 1, 4);
const shelfMaterial = new THREE.MeshBasicMaterial({ map: woodTexture });

const shelves = [];
for (let i = 0; i < 5; i++) {
    const shelf = new THREE.Mesh(shelfShape, shelfMaterial);
    shelf.translateY(i * 10);
    scene.add(shelf);
    shelves.push(shelf);
}

// Shelf Backing
const shelfBackingShape = new THREE.BoxGeometry(20, 50, 1);
const shelfBacking = new THREE.Mesh(shelfBackingShape, shelfMaterial);
shelfBacking.translateZ(-2.5);
shelfBacking.translateY(25);
scene.add(shelfBacking);

// Movie Data
const movies = [
    new Movie('Anora', '/anora_poster.jpg', 'Arial', 'lightgray', new THREE.Vector3(0, 3.5, 0), new THREE.Vector3(0, 3.5, 10), 4),
    new Movie('Didi', '/didi_poster.jpg', 'Arial', 'lightgray', new THREE.Vector3(-2, 3.5, 0), new THREE.Vector3(-2, 3.5, 10), 3)
];

// Add movies to the scene
movies.forEach(movie => scene.add(movie.movieObject));

// MOUSE MOVE EVENT
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Handle window resizing
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update raycaster with new mouse coordinates
    raycaster.setFromCamera(mouse, camera);

    // Get intersected movie objects
    const intersects = raycaster.intersectObjects(movies.map(movie => movie.movieObject));

    // Reset all movies to their start position
    movies.forEach(movie => movie.moveToStartPosition());

    // Move hovered movie to end position
    if (intersects.length > 0) {
        const hoveredMovie = intersects[0].object;
        movies.forEach(movie => {
            if (movie.movieObject === hoveredMovie) {
                movie.moveToEndPosition();
            }
        });
    }

    // Update all movies
    movies.forEach(movie => movie.update());

    renderer.render(scene, camera);
}

animate();

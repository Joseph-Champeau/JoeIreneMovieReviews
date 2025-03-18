import * as THREE from 'three';

class Movie {
    constructor(name, posterPath, font, color, startPosition, endPosition, rating) {
      // Properties
      this.name = name;
      this.poster = new THREE.TextureLoader().load(posterPath);  // Load the poster texture
      this.font = font;
      this.color = color;
      this.startPosition = startPosition || new THREE.Vector3(0, 0, 0); // Default to (0, 0, 0)
      this.endPosition = endPosition || new THREE.Vector3(0, 0, 10); // Default to (0, 0, 10)
      this.rating = rating; // Star rating (1-5)
  
      // Create the box geometry (CD box)
      this.boxGeometry = new THREE.BoxGeometry(0.5, 6, 4);
      
      // Create materials for the 6 faces of the box (poster on one face)
      const materials = [
        new THREE.MeshBasicMaterial({ map: this.poster }), // Front face (poster)
        new THREE.MeshBasicMaterial({ color: color }),     // Back face
        new THREE.MeshBasicMaterial({ color: color }),     // Top face
        new THREE.MeshBasicMaterial({ color: color }),     // Bottom face
        new THREE.MeshBasicMaterial({ color: color }),     // Left face
        new THREE.MeshBasicMaterial({ color: color })      // Right face
      ];
      
      // Create the 3D object
      this.movieObject = new THREE.Mesh(this.boxGeometry, materials);
      this.movieObject.position.copy(this.startPosition); // Set the starting position
      
      // Store the current target position and rotation
      this.targetPosition = this.startPosition.clone();
      this.targetRotation = new THREE.Euler(0, 0, 0);
    }
  
    // Method to move the movie object to the end position (when hovered)
    moveToEndPosition() {
      this.targetPosition = this.endPosition.clone();
      this.targetRotation = new THREE.Euler(0, -Math.PI / 2, 0); // Rotate 90 degrees on the Y-axis
    }
  
    // Method to reset the movie object to the start position (when not hovered)
    moveToStartPosition() {
      this.targetPosition = this.startPosition.clone();
      this.targetRotation = new THREE.Euler(0, 0, 0); // Reset rotation
    }
  
    // Method to update the movie object in each animation frame
    update() {
      // Smoothly move and rotate the object towards the target position and rotation
      this.movieObject.position.lerp(this.targetPosition, 0.1); // Move to target position smoothly
      this.movieObject.rotation.x += (this.targetRotation.x - this.movieObject.rotation.x) * 0.1;
      this.movieObject.rotation.y += (this.targetRotation.y - this.movieObject.rotation.y) * 0.1;
      this.movieObject.rotation.z += (this.targetRotation.z - this.movieObject.rotation.z) * 0.1;
    }
  }
  

  export default Movie;  // Export the Movie class so it can be imported elsewhere
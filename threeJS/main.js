import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Scene == Container
const scene = new THREE.Scene();

// Camera is the view.
// 1. The first argument Field of View (amount of world that is visible based on 360 degree view)
// 2. Aspect Ratio -- based on user Browser Window
// 3. View Frustum -- Since the camera is like a cone, this controls what is in sight (0.1 - 1000 allows us to see pretty much everything)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer renders the graphics to the scene
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera); //render == DRAW

const geometry = new THREE.TorusGeometry(11, 2.5, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xffd700,
  // flatShading: true,
  // wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(50, 50, 50);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addRings() {
  const tgeometry = new THREE.TorusGeometry(1.7, 0.45, 9, 100, 6.283185);
  const tmaterial = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    // wireframe: true,
  });
  const rings = new THREE.Mesh(tgeometry, tmaterial);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  rings.position.set(x, y, z);
  scene.add(rings);
}

Array(90).fill().forEach(addRings);

const lineDotTexture = new THREE.TextureLoader().load("sonic_the_hedgehog.jpg");
scene.background = lineDotTexture;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);

  console.log("hit");
}

animate();

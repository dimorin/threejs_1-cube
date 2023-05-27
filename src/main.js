import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';

window.addEventListener('load',function(){
  init();
})

function init(){
  const options = {
    color:0x00ffff,
  };

  const renderer = new THREE.WebGLRenderer({
    //alpha:true,
    antialias:true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500,
  );

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  //controls.autoRotateSpeed = 30;
  controls.enableDamping = true;
  //controls.dampingFactor = 0.01;
  controls.enablePan = true;
  controls.enableRotate = true;
  controls.enableZoom = true;
  //controls.maxDistance = 50; // zoom 범위
  //controls.minDistance = 10; // zoom 범위
  //controls.maxPolarAngle = Math.PI / 2; // 카메라 수직 각도 범위
  //controls.minPolarAngle = Math.PI / 3; // 카메라 수직 각도 범위
  controls.maxAzimuthAngle = Math.PI / 2; // 카메라 수평 각도 범위
  controls.minAzimuthAngle = Math.PI / 3; // 카메라 수평 각도 범위

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  const cubeGeometry = new THREE.IcosahedronGeometry(1);
  const cubeMaterial = new THREE.MeshStandardMaterial({
    color:0xcc99ff,
    transparent:true,
    opacity:0.5,
    //visible:false,
    //wireframe:true,
    //side:THREE.DoubleSide,
  });

  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  const skeletonGeometry = new THREE.IcosahedronGeometry(2);
  const skeletonMaterial = new THREE.MeshBasicMaterial({
    wireframe:true,
    transparent:true,
    opacity:0.2,
    color:0xaaaaaa,
  });

  const skeleton = new THREE.Mesh(skeletonGeometry, skeletonMaterial);

  scene.add(cube, skeleton);
 
  const directionalLight = new THREE.DirectionalLight(0xf0f0f0,1);
  directionalLight.position.set(-1,2,3);

  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  ambientLight.position.set(3,2,1);

  scene.add(ambientLight);

  camera.position.set(3,4,5);
  camera.lookAt(cube.position);  

  const clock = new THREE.Clock();

  render();

  function render(){
    //cube.rotation.x = THREE.MathUtils.degToRad(45);
    //cube.rotation.x += 0.01;
    //cube.rotation.x = Date.now() / 1000; // 어떤 환경에서든 똑같은 fps로 애니메이션 하기 위한 방법
    //cube.rotation.x += clock.getDelta();

    //cube.rotation.x = clock.getElapsedTime();
    //cube.rotation.y = clock.getElapsedTime();
    //skeleton.rotation.x = clock.getElapsedTime() * 1.5;
    //skeleton.rotation.y = clock.getElapsedTime() * 1.5;
    
    //cube.position.y = Math.sin(cube.rotation.x);
    //cube.scale.x = Math.cos(cube.rotation.x);

    renderer.render(scene, camera);

    controls.update();

    requestAnimationFrame(render);
  }

  function handleResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    controls.update();
  }

  window.addEventListener('resize', handleResize);

  const gui = new GUI();

  //gui.add(cube.position, 'y', -3, 3, 0.1);
  gui
    .add(cube.position, 'y')
    .min(-3)
    .max(3)
    .step(0.1);

  gui
    .addColor(options, 'color')
    .onChange((value) => {
      cube.material.color.set(value);
    });
}
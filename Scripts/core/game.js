/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var Mesh = THREE.Mesh;
var SpotLight = THREE.SpotLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var cube;
var plane;
var blobbyBoy;
var sphere;
var sphereMaterial;
var cubeMaterial;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    //scene.fog=new THREE.FogExp2( 0xffffff, 0.015 );
    scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
    console.log("Added Fog to scene...");
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    //Add a Plane to the Scene
    plane = new gameObject(new PlaneGeometry(60, 40, 1, 1), new LambertMaterial({ color: 0xffffff }), 0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    blobbyBoy = new THREE.Object3D();
    //Add a Sphere to the humanoid (head)
    sphere = new SphereGeometry(4, 10, 20);
    sphereMaterial = new LambertMaterial({ 'Assets/Textures/plaid.jpg':  });
    sphere = new Mesh(sphere, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = 0;
    sphere.position.y = 10;
    sphere.position.z = 0;
    blobbyBoy.add(sphere);
    //Add a Sphere to the humanoid (body)
    sphere = new SphereGeometry(4, 20, 20);
    sphereMaterial = new LambertMaterial({ color: 0x63F7CA });
    sphere = new Mesh(sphere, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = 0;
    sphere.position.y = 4;
    sphere.position.z = 0;
    blobbyBoy.add(sphere);
    //Add a Arms to the humanoid
    cube = new BoxGeometry(2, 2, 15);
    cubeMaterial = new LambertMaterial({ color: 0x63F7CA });
    cube = new Mesh(cube, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 7;
    cube.position.z = 0;
    blobbyBoy.add(cube);
    cube = new BoxGeometry(2, 5, 2);
    cubeMaterial = new LambertMaterial({ color: 0x63F7CA });
    cube = new Mesh(cube, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 4;
    cube.position.z = 6.5;
    blobbyBoy.add(cube);
    blobbyBoy.add(cube);
    cube = new BoxGeometry(2, 5, 2);
    cubeMaterial = new LambertMaterial({ color: 0x63F7CA });
    cube = new Mesh(cube, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 4;
    cube.position.z = -6.5;
    blobbyBoy.add(cube);
    //Add a Sphere to the humanoid (Feet)
    sphere = new SphereGeometry(4, 2, 2);
    sphereMaterial = new LambertMaterial({ color: 0x63F7CA });
    sphere = new Mesh(sphere, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = -1;
    sphere.position.y = 2;
    sphere.position.z = 2;
    blobbyBoy.add(sphere);
    sphere = new SphereGeometry(4, 2, 2);
    sphereMaterial = new LambertMaterial({ color: 0x63F7CA });
    sphere = new Mesh(sphere, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = -1;
    sphere.position.y = 2;
    sphere.position.z = -2;
    blobbyBoy.add(sphere);
    scene.add(blobbyBoy);
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0xCEECF5);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    // add controls
    gui = new GUI();
    control = new Control(0.02, 60, 40);
    addControl(control);
    console.log("Added Control to scene...");
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'rotationSpeed', -0.5, 0.5);
    //gui.add(controlObject, 'addCube');
    //gui.add(controlObject, 'removeCube');
    //gui.add(controlObject, 'outputObjects');
    //gui.add(controlObject, 'numberOfObjects').listen();
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    scene.traverse(function (threeObject) {
        if (threeObject == blobbyBoy) {
            threeObject.rotation.x += control.rotationSpeed;
        }
    });
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}

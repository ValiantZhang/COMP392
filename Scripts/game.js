// MAIN GAME FILE
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Mesh = THREE.Mesh;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var scene;
var renderer;
var camera;
var cubeGeometry;
var planeGeometry;
var sphereGeometry;
var cubeMaterial;
var planeMaterial;
var sphereMaterial;
var axes;
var cube;
var plane;
var sphere;
var spotLight;
var pointLight;
var control;
var gui;
var stats;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    //Add a Plane to the Scene
    planeGeometry = new PlaneGeometry(60, 20);
    planeMaterial = new LambertMaterial({ color: 0xFFFFFF });
    plane = new Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    //Add a Sphere to the Scene (head)
    sphereGeometry = new SphereGeometry(4, 10, 20);
    sphereMaterial = new LambertMaterial({ color: 0x63F7CA });
    sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = 0;
    sphere.position.y = 10;
    sphere.position.z = 0;
    scene.add(sphere);
    //Add a Sphere to the Scene (body)
    sphereGeometry = new SphereGeometry(4, 20, 20);
    sphereMaterial = new LambertMaterial({ color: 0x63F7CA });
    sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = 0;
    sphere.position.y = 4;
    sphere.position.z = 0;
    scene.add(sphere);
    //Add a Arms to the Scene
    cubeGeometry = new BoxGeometry(2, 2, 15);
    cubeMaterial = new LambertMaterial({ color: 0x63F7CA });
    cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 7;
    cube.position.z = 0;
    scene.add(cube);cubeGeometry = new BoxGeometry(2, 5, 2);
    cubeMaterial = new LambertMaterial({ color: 0x63F7CA });
    cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 4;
    cube.position.z = 6;
    scene.add(cube);
    
    scene.add(cube);cubeGeometry = new BoxGeometry(2, 5, 2);
    cubeMaterial = new LambertMaterial({ color: 0x63F7CA });
    cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 4;
    cube.position.z = -6;
    scene.add(cube);
    //Add a Sphere to the Scene (Feet)
    sphereGeometry = new SphereGeometry(4, 2, 2);
    sphereMaterial = new LambertMaterial({ color: 0x63F7CA });
    sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = -2;
    sphere.position.y = 2;
    sphere.position.z = 2;
    scene.add(sphere);
    
    sphereGeometry = new SphereGeometry(4, 2, 2);
    sphereMaterial = new LambertMaterial({ color: 0x63F7CA });
    sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = -2;
    sphere.position.y = 2;
    sphere.position.z = -2;
    scene.add(sphere);
    
    //Add Hat
    sphereGeometry = new SphereGeometry(5, 0, 5);
    sphereMaterial = new LambertMaterial({ color: 0x63F7CA });
    sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = 0;
    sphere.position.y = 0;
    sphere.position.z = 0;
    scene.add(sphere);
    
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added Spot Light to Scene");
    document.body.appendChild(renderer.domElement);
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
//# sourceMappingURL=game.js.map
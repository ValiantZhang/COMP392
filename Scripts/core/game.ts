/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Mesh = THREE.Mesh;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var cube: Mesh;
var plane: Mesh;
var blobbyBoy: gameObject;
var blobbyBoyColor;
var sphere: Mesh;
var sphereMaterial : MeshLambertMaterial;
var cubeMaterial : MeshLambertMaterial;
var headMaterial : MeshLambertMaterial;
var neckMaterial : MeshLambertMaterial;
var shoulderMaterial : MeshLambertMaterial;
var leftArmMaterial : MeshLambertMaterial;
var rightArmMaterial : MeshLambertMaterial;
var leftLegMaterial : MeshLambertMaterial;
var rightLegMaterial : MeshLambertMaterial;
var leftFootMaterial : MeshLambertMaterial;
var rightFootMaterial : MeshLambertMaterial;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var config;
var colorConfig;
var colorPicker;
var blobbyBoyColor;
var shirtTexture = THREE.ImageUtils.loadTexture( "../../Assets/Textures/plaid.jpg" );

function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
    
    //scene.fog=new THREE.FogExp2( 0xffffff, 0.015 );
    scene.fog=new THREE.Fog( 0xffffff, 0.015, 100 );
    console.log("Added Fog to scene...");
	
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
    //Add a Plane to the Scene
    plane = new gameObject(
        new PlaneGeometry(60, 40, 1, 1),
        new LambertMaterial({ color: 0xffffff }),
        0, 0, 0);

    plane.rotation.x = -0.5 * Math.PI;

    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    
    blobbyBoyColor = new Color(0x63F7CA);
    config = function(){this.color = "#000000";}
    colorConfig = new config();
    blobbyBoy = new THREE.Object3D();
     
    //Add a Sphere to the humanoid (head)
    sphere = new SphereGeometry(4, 10, 20);
    headMaterial = new LambertMaterial({ color: blobbyBoyColor });
    sphere = new Mesh(sphere, headMaterial);
    sphere.castShadow = true;
    sphere.position.x = 0;
    sphere.position.y = 20;
    sphere.position.z = 0;
    blobbyBoy.add(sphere);
    
    //Add a Sphere to the humanoid (body)
    sphere = new SphereGeometry(5, 40, 40);
    sphereMaterial = new LambertMaterial({ map: shirtTexture });
    sphere = new Mesh(sphere, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = 0;
    sphere.position.y = 10;
    sphere.position.z = 0;
    blobbyBoy.add(sphere);
    
    //Add a neck to the humanoid
    cube = new BoxGeometry(2, 3, 2);
    neckMaterial = new LambertMaterial({ color: blobbyBoyColor });
    cube = new Mesh(cube, neckMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 15;
    cube.position.z = 0;
    blobbyBoy.add(cube);
    
    //Add a Arms to the humanoid (shoulder)
    cube = new BoxGeometry(2, 2, 16);
    shoulderMaterial = new LambertMaterial({ color: blobbyBoyColor });
    cube = new Mesh(cube, shoulderMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 13;
    cube.position.z = 0;
    blobbyBoy.add(cube);
    
    //Add a Arms to the humanoid (left)
    cube = new BoxGeometry(2, 5, 2);
    leftArmMaterial = new LambertMaterial({ color: blobbyBoyColor });
    cube = new Mesh(cube, leftArmMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 11;
    cube.position.z = 7;
    blobbyBoy.add(cube);
    
    //Add a Arms to the humanoid (right)
    cube = new BoxGeometry(2, 5, 2);
    rightArmMaterial = new LambertMaterial({ color: blobbyBoyColor });
    cube = new Mesh(cube, rightArmMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 15;
    cube.position.z = -7;
    blobbyBoy.add(cube);
    
    //Add a Legs to the humanoid (left)
    cube = new BoxGeometry(2, 8, 2);
    leftLegMaterial = new LambertMaterial({ color: blobbyBoyColor });
    cube = new Mesh(cube, leftLegMaterial);
    cube.castShadow = true;
    cube.position.x = -5;
    cube.position.y = 3;
    cube.position.z = 2;
    blobbyBoy.add(cube);
    
    cube = new BoxGeometry(5, 2, 2);
    leftFootMaterial = new LambertMaterial({ color: blobbyBoyColor });
    cube = new Mesh(cube, leftFootMaterial);
    cube.castShadow = true;
    cube.position.x = -2;
    cube.position.y = 6;
    cube.position.z = 2;
    blobbyBoy.add(cube);
    
    
    //Add a Legs to the humanoid (right)
    cube = new BoxGeometry(2, 8, 2);
    rightLegMaterial = new LambertMaterial({ color: blobbyBoyColor });
    cube = new Mesh(cube, rightLegMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 3;
    cube.position.z = -2;
    blobbyBoy.add(cube);
    
    cube = new BoxGeometry(5, 2, 2);
    rightFootMaterial = new LambertMaterial({ color: blobbyBoyColor });
    cube = new Mesh(cube, rightFootMaterial);
    cube.castShadow = true;
    cube.position.x = 2;
    cube.position.y = 1;
    cube.position.z = -2;
    blobbyBoy.add(cube);
    
    //Add humanoid to scene
    scene.add(blobbyBoy);
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x0c0c0c);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-20, -30, 5);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    
    // add controls
    gui = new GUI();
    control = new Control(0.0, 0.0, 0.0);
    addControl(control);

    console.log("Added Control to scene...");
    
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function addControl(controlObject: Control): void {
    gui.add(controlObject, 'rotationSpeedX', -0.5, 0.5);
    gui.add(controlObject, 'rotationSpeedY', -0.5, 0.5);
    gui.add(controlObject, 'rotationSpeedZ', -0.5, 0.5);
    
    colorPicker = gui.addColor( colorConfig, 'color').onChange(
        function(getColor){
            //getColor=getColor.replace( '#','0x' );
            headMaterial.color =  new THREE.Color(getColor);
            neckMaterial.color = new THREE.Color(getColor);
            shoulderMaterial.color = new THREE.Color(getColor);
            leftArmMaterial.color =  new THREE.Color(getColor);
            rightArmMaterial.color = new THREE.Color(getColor);
            leftLegMaterial.color =  new THREE.Color(getColor);
            rightLegMaterial.color = new THREE.Color(getColor);
            leftFootMaterial.color =  new THREE.Color(getColor);
            rightFootMaterial.color = new THREE.Color(getColor);
            console.log(getColor);
        });

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
function gameLoop(): void {
    stats.update();
    
    scene.traverse(function(threeObject:THREE.Object3D) {
        if (threeObject == blobbyBoy) {
            threeObject.rotation.x += control.rotationSpeedX;
            threeObject.rotation.y += control.rotationSpeedY;
            threeObject.rotation.z += control.rotationSpeedZ;
    });
    
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -30;
    camera.position.y = 2;
    camera.position.z = 10;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}

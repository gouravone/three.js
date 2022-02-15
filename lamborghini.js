
const backgroundColor = '0xdddddd';

/*////////////////////////////////////////*/
var isAmbient = false
let turnOnLight = false
let ambientcolor = 0x20202A

var renderCalls = [];
function render() {
    requestAnimationFrame(render);
    renderCalls.forEach((callback) => { callback(); });
    let click = document.getElementById('click')
    click.onclick = () => LightturnOn()

}
render();

/**
 * We need to create the scene,
 * before loading our 3d models
 */

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 100, 100);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(backgroundColor);//0x );

renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = Math.pow(0.94, 5.0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, true);

document.body.appendChild(renderer.domElement);

function renderScene() { renderer.render(scene, camera); }
renderCalls.push(renderScene);

/**
 * OrbitControls handeler enables,
 * drag and rotate our 3D model,
 * 360 degree
 */

var controls = new THREE.OrbitControls(camera);

controls.rotateSpeed = 0.05;
controls.zoomSpeed = 0.9;

controls.minDistance = 3;
controls.maxDistance = 20;

controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI / 2; // radians

controls.enableDamping = true;
controls.dampingFactor = 0.05;

renderCalls.push(function () {
    controls.update()
});


/**
 * 
 * @param {LightturnOn} params 
 * The methods adds PointLight & AmbientLight
 */

function LightturnOn(params) {
    isAmbient = !isAmbient
    if(isAmbient && !turnOnLight){
        var light = new THREE.PointLight('0xff0000', 5, 100);
        light.position.set(4, 30, -20);
        scene.add(light);
        
        var light2 = new THREE.AmbientLight(ambientcolor, 20, 100);
        light2.position.set(30, -10, 30);
        scene.add(light2);
        turnOnLight = true
    }
}


/**
 * Below code, loads our 3D model and add to our created scene
*/

var loader = new THREE.GLTFLoader();
loader.crossOrigin = true;
loader.load('./Models/aventador.gltf', function (data) {
    var object = data.scene;
    object.scale.set(1,1,1);
    object.position.set(0, 0, 0);
    scene.add(object);
});

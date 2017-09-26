var THREE = require('three'),
	SPHERECURSOR = require('./spherecursor'),
	SPHEREHELPER = require('./spherehelper'),
	PANANDZOOMUI = require('./panandzoomui'),
	viewAngle = 70, //37.8,
	lineThickness = .2,
	sphereRadius = 100,
	scene = new THREE.Scene(),
	camera = new THREE.PerspectiveCamera(viewAngle, 1, 1, 200),
	unprojectionMatrix = SPHEREHELPER.getUnprojectionMatrix(camera),
	unprojectionMatrixArray,
	bezierworker = new Worker('bezierworker.js'),
	loader = new THREE.JSONLoader(),
	renderer = new THREE.WebGLRenderer({ antialias: true }),
	cursor = new SPHERECURSOR.SphereCursor(camera, lineThickness, sphereRadius);

// ---------------------------------------------------------------------------------------
						var TEXTPRINTING = require('./textprinting');
// ---------------------------------------------------------------------------------------

scene.background = new THREE.Color(0xffffff);

cursor.onUpdate(function () {
	requestAnimationFrame(animate);
});
scene.add(cursor.item);

bezierworker.addEventListener('message', function (e) {
	if (e.data.cmd === 'meshReady') {
		addTubeMesh(tubeGeometryFromArrayBuffer(e.data.mesh));
	}
}, false);
bezierworker.postMessage({'cmd': 'init', 'lineThickness': lineThickness, 'sphereRadius': sphereRadius, 'screenDimensions': [window.innerWidth, window.innerHeight]});

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateView();
}
window.addEventListener('resize', onWindowResize, false);
onWindowResize();

document.body.appendChild(renderer.domElement);

function updateView() {
	cursor.update();
	unprojectionMatrix = SPHEREHELPER.getUnprojectionMatrix(camera);
	unprojectionMatrixArray = unprojectionMatrix.toArray();
	bezierworker.postMessage({'cmd': 'updateView', 'matrix': unprojectionMatrixArray, 'screenDimensions': [window.innerWidth, window.innerHeight]});
}

PANANDZOOMUI.registerCamera(camera);
PANANDZOOMUI.onViewChange(updateView);

window.addEventListener('pointerdown', function () {
	TEXTPRINTING.output("button: " + event.buttons, 0); // 1: pen, 32: eraser
}, false);

window.addEventListener('pointermove', function () {
	TEXTPRINTING.output("pressure: " + event.pressure, 1);
}, false);

window.addEventListener('contextmenu', function () {
	event.preventDefault();
	return false;
}, false);

var tubematerial = new THREE.MeshBasicMaterial({ color: 0x000000 });

function addPathFromScreen(path) {
	bezierworker.postMessage({'cmd': 'projectPath', 'path': path});
}

function tubeGeometryFromArrayBuffer( arrayBuffer ) {
	var position = new THREE.BufferAttribute( arrayBuffer, 3 ),
		geometry = new THREE.BufferGeometry();
	geometry.addAttribute( 'position', position );
	return geometry;
}

function addTubeMesh(tubegeometry) {
	tubeMeshObject = new THREE.Mesh(tubegeometry, tubematerial);
	scene.add(tubeMeshObject);
	cursor.update();
}

function animate() {
	renderer.render(scene, camera);
}
animate();

exports.addPathFromScreen = addPathFromScreen;
var THREE = require('three'),
	MESHLINE = require('three.meshline'),
	SPHERECURSOR = require('./spherecursor'),
	SPHEREHELPER = require('./spherehelper'),
	PANANDZOOMUI = require('./panandzoomui'),
	viewAngle = 70, //37.8,
	lineThickness = .2,
	sphereRadius = 100,
	scene = new THREE.Scene(),
	camera = new THREE.PerspectiveCamera(viewAngle, 1, 1, 200),
	renderer = new THREE.WebGLRenderer({ antialias: true }),
	cursor = new SPHERECURSOR.SphereCursor(camera, lineThickness, sphereRadius);

// ---------------------------------------------------------------------------------------
						var TEXTPRINTING = require('./textprinting');
// ---------------------------------------------------------------------------------------

scene.background = new THREE.Color(0xffffff);

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);
onWindowResize();

document.body.appendChild(renderer.domElement);

PANANDZOOMUI.registerCamera(camera);
PANANDZOOMUI.onViewChange(function () {
	cursor.update();
});

cursor.onUpdate(function () {
	requestAnimationFrame(animate);
});
scene.add(cursor.item);

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
	var i = 0,
		ilimit = path.length,
		n = 0,
		nlimit = 8,
		point,
		points,
		curve,
		curvePath = new THREE.CurvePath(),
		tubegeometry,
		curveObject,
		linegeometry,
		meshlinegeometry = new MESHLINE.MeshLine(),
		resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );
	for (; i < ilimit; i += 1) {
		points = [];
		for (n = 0; n < nlimit; n += 2) {
			point = SPHEREHELPER.normalizeAndCenterPoint([path[i][n], path[i][n + 1]]);
			point = SPHEREHELPER.projectPointOntoSphere(point, sphereRadius, SPHEREHELPER.getUnprojectionMatrix(camera));
			points.push(point);
		}
		curve = new THREE.CubicBezierCurve3(points[0], points[1], points[2], points[3]);
		curvePath.add(curve);
	}
	tubegeometry = new THREE.TubeGeometry(curvePath, 100, lineThickness, 16, false);
	curveObject = new THREE.Mesh(tubegeometry, tubematerial);
	scene.add(curveObject);
	cursor.update();
}

function animate() {
	renderer.render(scene, camera);
}
animate();

exports.addPathFromScreen = addPathFromScreen;
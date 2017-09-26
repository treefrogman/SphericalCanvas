var THREE = require('three'),
	SPHEREHELPER = require('./spherehelper');

// ---------------------------------------------------------------------------------------
						var TEXTPRINTING = require('./textprinting');
// ---------------------------------------------------------------------------------------

function SphereCursor(camera, lineThickness, sphereRadius) {
	var geometry = new THREE.CircleGeometry(lineThickness, 16),
		edges = new THREE.EdgesGeometry(geometry),
		material = new THREE.LineBasicMaterial({ color: 0x000000 }),
		cursor = new THREE.LineSegments(edges, material),
		planarPosition = [0, 0],
		hidden = false,
		updateCallback;
	
	function moveTo(point) {
		planarPosition = point;
		update();
	}
	
	window.addEventListener('pointermove', function() {
		if (hidden) {
			hidden = false;
			cursor.layers.enable(0);
		}
		moveTo(SPHEREHELPER.normalizeAndCenterPoint([event.clientX, event.clientY], [window.innerWidth, window.innerHeight]));
	}, false);
	
	document.body.addEventListener('pointerleave', function() {
		hidden = true;
		cursor.layers.disable(0);
	}, false);

	function update() {
		var pointOnSphere,
			axis = new THREE.Vector3(0, 0, 1),
			sphericalCoords;
		pointOnSphere = SPHEREHELPER.projectPointOntoSphere(planarPosition, sphereRadius - lineThickness - .1, SPHEREHELPER.getUnprojectionMatrix(camera));
		sphericalCoords = SPHEREHELPER.eulerToSpherical(pointOnSphere);
		cursor.position.copy(pointOnSphere);
		cursor.quaternion.setFromUnitVectors(axis, pointOnSphere.normalize());
		updateCallback();
		TEXTPRINTING.output( "cursorX: " + pointOnSphere.x.toFixed(3), 2 );
		TEXTPRINTING.output( "cursorY: " + pointOnSphere.y.toFixed(3), 3 );
		TEXTPRINTING.output( "cursorZ: " + pointOnSphere.z.toFixed(3), 4 );
		TEXTPRINTING.output( "cursorTheta: " + ( sphericalCoords.theta * 180 / Math.PI ).toFixed( 3 ), 5 );
		TEXTPRINTING.output( "cursorPhi: " + ( sphericalCoords.phi * 180 / Math.PI ).toFixed( 3 ), 6 );
	}
	this.item = cursor;
	this.update = update;
	this.onUpdate = function (callback) {
		updateCallback = callback;
	};
}

exports.SphereCursor = SphereCursor;
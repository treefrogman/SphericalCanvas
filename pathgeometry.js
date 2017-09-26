var THREE = require('three'),
	SPHEREHELPER = require('./spherehelper');

function createThetaPhiPathFromXYPath(path, lineThickness, sphereRadius, unprojectionMatrix, screenDimensions) {
	var i = 0,
		ilimit = path.length,
		n = 0,
		nlimit = 8,
		point,
		points,
		curve,
		curvePath = new THREE.CurvePath(),
		tubegeometry,
		tubebuffergeometry,
		bufferArray;
	for (; i < ilimit; i += 1) {
		points = [];
		for (n = 0; n < nlimit; n += 2) {
			point = SPHEREHELPER.normalizeAndCenterPoint([path[i][n], path[i][n + 1]], screenDimensions);
			point = SPHEREHELPER.projectPointOntoSphere(point, sphereRadius, unprojectionMatrix);
			points.push(point);
		}
		curve = new THREE.CubicBezierCurve3(points[0], points[1], points[2], points[3]);
		curvePath.add(curve);
	}
	tubegeometry = new THREE.TubeGeometry(curvePath, 100, lineThickness, 16, false);
	tubebuffergeometry = new THREE.BufferGeometry().fromGeometry(tubegeometry);
	bufferArray = tubebuffergeometry.attributes.position.array.buffer;
	return bufferArray;
}

exports.createThetaPhiPathFromXYPath = createThetaPhiPathFromXYPath;
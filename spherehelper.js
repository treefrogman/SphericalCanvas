var THREE = require('three');

function normalizeAndCenterPoint(point, screenDimensions) {
	return [(point[0] / screenDimensions[0]) * 2 - 1, 1 - (point[1] / screenDimensions[1]) * 2];
}

function getUnprojectionMatrix(camera) {
	var matrix = new THREE.Matrix4();
	matrix.multiplyMatrices(camera.matrixWorld, matrix.getInverse(camera.projectionMatrix));
	return matrix;
}

function projectPointOntoSphere(point, sphereRadius, unprojectionMatrix) {
	var pointVector = new THREE.Vector3();
	pointVector.set(point[0], point[1], 0.5);
	pointVector.applyMatrix4(unprojectionMatrix);
	pointVector.normalize();
	pointVector.multiplyScalar(sphereRadius);
	return pointVector;
}

function eulerToSpherical(point) {
	var sphericalCoords = new THREE.Spherical(),
		//sphericalCorrection = new THREE.Euler(90 * Math.PI / 180, 0, 0),
		newPoint = point.clone();
	//newPoint.applyEuler(sphericalCorrection);
	sphericalCoords.setFromVector3(newPoint);
	return sphericalCoords;
}

exports.normalizeAndCenterPoint = normalizeAndCenterPoint;
exports.getUnprojectionMatrix = getUnprojectionMatrix;
exports.projectPointOntoSphere = projectPointOntoSphere;
exports.eulerToSpherical = eulerToSpherical;
var THREE;

THREE = require( 'three' );

function normalizeAndCenterPoint( point, screenDimensions ) {
	return [
		( point[ 0 ] / screenDimensions[ 0 ] ) * 2 - 1,
		1 - ( point[ 1 ] / screenDimensions[ 1 ] ) * 2
	];
}

function getUnprojectionMatrix( camera ) {
	var matrix;
	
	matrix = new THREE.Matrix4();
	matrix.multiplyMatrices(
		camera.matrixWorld,
		matrix.getInverse( camera.projectionMatrix )
	);
	
	return matrix;
}

function projectPointOntoSphere( point, sphereRadius, unprojectionMatrix ) {
	var pointVector;
	
	pointVector = new THREE.Vector3( point[ 0 ], point[ 1 ], 0.5 )
		.applyMatrix4( unprojectionMatrix )
		.normalize()
		.multiplyScalar( sphereRadius );
	
	return pointVector;
}

function eulerToSpherical( point ) {
	var sphericalCoords;
	
	sphericalCoords = new THREE.Spherical().setFromVector3( point );
	
	return sphericalCoords;
}

exports.normalizeAndCenterPoint = normalizeAndCenterPoint;
exports.getUnprojectionMatrix = getUnprojectionMatrix;
exports.projectPointOntoSphere = projectPointOntoSphere;
exports.eulerToSpherical = eulerToSpherical;
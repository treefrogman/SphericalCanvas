var THREE, SPHEREHELPER;

THREE = require( 'three' );
SPHEREHELPER = require( './spherehelper' );

function projectPathOntoSphere(
	path, lineThickness, sphereRadius, unprojectionMatrix, screenDimensions
) {
	var i, ilimit, n, nlimit, point, points, curve, curvePath, tubegeometry,
		tubebuffergeometry, bufferArray;
	
	i = 0;
	ilimit = path.length;
	n = 0;
	nlimit = 8;
	curvePath = new THREE.CurvePath();
	for ( ; i < ilimit; i += 1 ) {
		points = [];
		for ( n = 0; n < nlimit; n += 2 ) {
			point = SPHEREHELPER.normalizeAndCenterPoint([
				path[ i ][ n ],
				path[ i ][ n + 1 ]
			], screenDimensions);
			point = SPHEREHELPER.projectPointOntoSphere(
				point, sphereRadius, unprojectionMatrix
			);
			points.push( point );
		}
		curve = new THREE.CubicBezierCurve3(
			points[ 0 ], points[ 1 ], points[ 2 ], points[ 3 ]
		);
		curvePath.add( curve );
	}
	tubegeometry = new THREE.TubeGeometry( curvePath, 100, lineThickness, 16, false );
	tubebuffergeometry = new THREE.BufferGeometry().fromGeometry( tubegeometry );
	bufferArray = tubebuffergeometry.attributes.position.array.buffer;
	return bufferArray;
}

exports.projectPathOntoSphere = projectPathOntoSphere;
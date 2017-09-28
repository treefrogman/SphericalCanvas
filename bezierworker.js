var THREE, SPHEREHELPER, PATHGEOMETRY, lineThickness, sphereRadius, unprojectionMatrix,
	screenDimensions, mesh, arrayBuffer;

THREE = require( 'three' );
SPHEREHELPER = require( './spherehelper' );
PATHGEOMETRY = require( './pathgeometry' );

self.addEventListener( 'message', function( e ) {
	
	if ( e.data.cmd === 'init' ) {
		
		lineThickness = e.data.lineThickness;
		sphereRadius = e.data.sphereRadius;
		screenDimensions = e.data.screenDimensions;
		
	} else if ( e.data.cmd === 'updateView' ) {
		
		unprojectionMatrix = new THREE.Matrix4().fromArray( e.data.matrix );
		screenDimensions = e.data.screenDimensions;
		
	} else if ( e.data.cmd === 'projectPath' ) {
		
		arrayBuffer = PATHGEOMETRY.projectPathOntoSphere(
			e.data.path,
			lineThickness,
			sphereRadius,
			unprojectionMatrix,
			screenDimensions
		);
		self.postMessage( { 'cmd': 'meshReady', 'mesh': arrayBuffer }, [ arrayBuffer ] );
		
	}
	
}, false );
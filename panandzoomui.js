var camera, zoomLevel, viewChangeCallback;

zoomLevel = 4;

// ---------------------------------------------------------------------------------------
						var TEXTPRINTING = require( './textprinting' );
// ---------------------------------------------------------------------------------------

window.addEventListener( 'mousewheel', function () {
	var wDY;
	
	wDY = event.wheelDeltaY;
	
	if ( Math.abs( wDY ) === 120 && event.deltaY * -3 !== wDY ) {
		event.preventDefault();
		zoomCamera( wDY / 120 );
	} else {
		rotateCamera( event.wheelDeltaX, event.wheelDeltaY );
	}
	camera.updateMatrixWorld();
	viewChangeCallback();
}, false );

function zoomCamera( zoomAmt ) {
	var zoom;
	
	zoom = zoomLevel + zoomAmt / 6;
	zoomLevel = Math.min( Math.max( zoom, 1 ), 9 );
	camera.fov = 100 - 9 * zoomLevel;
	camera.updateProjectionMatrix();
}

function rotateCamera( wDX, wDY ) {
	var rotx, roty;
	
	rotx = camera.rotation.x + ( wDY / 180 / Math.PI / zoomLevel );
	rotx = Math.max( Math.min( rotx, Math.PI / 2 ), - Math.PI / 2 );
	roty = camera.rotation.y + ( wDX / 180 / Math.PI / zoomLevel );
	
	camera.rotation.x = rotx;
	camera.rotation.y = roty;
	
	TEXTPRINTING.output( "rotX: " + rotx, 7 );
	TEXTPRINTING.output( "rotY: " + roty, 8 );
}

exports.registerCamera = function ( newcamera ) {
	camera = newcamera;
	camera.rotation.order = 'YXZ';
}

exports.onViewChange = function ( callback ) {
	viewChangeCallback = callback;
}

exports.zoomLevel = zoomLevel;
var camera, zoomRange, zoomLevel, rotationXRange, rotationX, rotationY,
    viewChangeCallback;

zoomRange = [ 1, 9 ];
zoomLevel = 4;
rotationXRange = [ Math.PI / 2, - Math.PI / 2 ];
rotationX = 0;
rotationY = 0;

// ---------------------------------------------------------------------------------------
                        var TEXTPRINTING = require( './textprinting' );
// ---------------------------------------------------------------------------------------

function zoomView( zoomAmt ) {
    setZoom(zoomLevel + zoomAmt);
}

function setZoom(zoom) {
    zoomLevel = Math.min( Math.max( zoom, zoomRange[ 0 ] ), zoomRange[ 1 ] );
    
    camera.fov = 100 - 9 * zoomLevel;
    TEXTPRINTING.output( "zoom: " + zoomLevel, 9 );
    
    updateView();
}

function panView( wDX, wDY ) {
    setRotation(
        camera.rotation.x + ( wDY / 180 / Math.PI / zoomLevel ),
        camera.rotation.y + ( wDX / 180 / Math.PI / zoomLevel )
    );
}

function setRotation( rotx, roty ) {
    rotx = Math.max( Math.min( rotx, rotationXRange[ 0 ] ), rotationXRange[ 1 ] );
    
    camera.rotation.x = rotationX = rotx;
    camera.rotation.y = rotationY = roty;
    
    TEXTPRINTING.output( "rotX: " + rotationX, 7 );
    TEXTPRINTING.output( "rotY: " + rotationY, 8 );
    updateView();
}

function updateView() {
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();
    viewChangeCallback();
}

exports.registerCamera = function ( newcamera ) {
    camera = newcamera;
    camera.rotation.order = 'YXZ';
}

exports.onViewChange = function ( callback ) {
    viewChangeCallback = callback;
}

exports.zoomLevel = zoomLevel;

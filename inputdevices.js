var PANANDZOOMUI;

PANANDZOOMUI = require( './panandzoomui' );

window.addEventListener( 'mousewheel', function () {
	var wDX, wDY;
	
	wDX = event.wheelDeltaX;
	wDY = event.wheelDeltaY;
	
	event.preventDefault();
	if ( Math.abs( wDY ) === 120 && event.deltaY * -3 !== wDY ) {
		PANANDZOOMUI.zoomView( wDY / 120 / 6 );
	} else {
		PANANDZOOMUI.panView( wDX, wDY );
	}
}, false );
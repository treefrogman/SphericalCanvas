var RENDERSPHERE, DRAWINGPLANE, lineWidth;

RENDERSPHERE = require( './rendersphere' );
DRAWINGPLANE = require( './drawingplane' );

lineWidth = .2;

// ---------------------------------------------------------------------------------------
                        var TEXTPRINTING = require( './textprinting' ),
                            output = TEXTPRINTING.output;
// ---------------------------------------------------------------------------------------

DRAWINGPLANE.setLineWidth( lineWidth * 15 );

DRAWINGPLANE.onStrokeEnd( function ( stroke ) {
    RENDERSPHERE.addPathFromScreen( stroke );
} );

RENDERSPHERE.onStrokeProjected( function () {
    DRAWINGPLANE.removeOldestPath();
} );

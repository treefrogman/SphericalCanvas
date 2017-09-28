var PAPER, lineWidth, pathStack, canvas, path, outputCallback;

PAPER = require( 'paper/dist/paper-core' );

lineWidth = .2;
pathStack = [];

canvas = document.createElement( 'canvas' );
canvas.setAttribute( 'resize', 'true' );
document.body.appendChild( canvas );
PAPER.setup( canvas );

PAPER.view.onMouseDown = function ( event ) {
    path = new PAPER.Path();
    path.strokeWidth = lineWidth;
    path.strokeJoin = 'round';
    path.strokeCap = 'round';
    path.strokeColor = 'black';
};

PAPER.view.onMouseDrag = function ( event ) {
    // Every drag event, add a point to the path at the current position of the mouse:
    path.add( event.point );
};

PAPER.view.onMouseUp = function ( event ) {
    path.simplify();
    if ( path.curves.length ) {
        pathStack.push( path );
        output = path.curves.map( function ( item, index ) {
            return item.values;
        } );
        outputCallback( output );
    }
};

exports.setLineWidth = function ( width ) {
    lineWidth = width;
};

exports.onStrokeEnd = function ( callback ) {
    outputCallback = callback;
};

exports.removeOldestPath = function () {
    pathStack.shift().remove();
};

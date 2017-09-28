var textOutput, lines, compactOutput;

textOutput = document.createElement( "pre" );
lines = [];

document.body.appendChild( textOutput );

function output( text, line ) {
	lines[ line ] = text;
	compactOutput = lines.filter( function( x ) {
		return ( x !== ( undefined || null || '' ) );
	} );
	textOutput.textContent = lines.join( "\n" );
}

exports.output = output;
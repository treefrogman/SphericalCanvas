var PAPER = require('paper/dist/paper-core'),
	canvas = document.createElement('canvas'),
	path,
	outputCallback,
	lineWidth = .2,
	pathStack = [];

canvas.setAttribute('resize', 'true');
document.body.appendChild(canvas);
PAPER.setup(canvas);

PAPER.view.onMouseDown = function (event) {
	// If we produced a path before, deselect it:
	path = new PAPER.Path();
	path.strokeWidth = lineWidth;
	path.strokeJoin = 'round';
	path.strokeCap = 'round';
	path.strokeColor = 'black';
};

PAPER.view.onMouseDrag = function (event) {
	// Every drag event, add a point to the path at the current position of the mouse:
	path.add(event.point);
};

PAPER.view.onMouseUp = function (event) {
	path.simplify();
	if (path.curves.length) {
		pathStack.push(path);
		output = path.curves.map(function (item, index) {
			return item.values;
		});
		outputCallback(output);
	}
};

exports.removeOldestPath = function () {
	pathStack.shift().remove();
}

exports.setLineWidth = function (width) {
	lineWidth = width;
};

exports.onStrokeEnd = function (callback) {
	outputCallback = callback;
};
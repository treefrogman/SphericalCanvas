var textOutput = document.createElement("pre"),
	lines = [];
document.body.appendChild(textOutput);
function output(text, line) {
	lines[line] = text;
	textOutput.textContent = lines.join("\n");
}
exports.output = output;
# SphericalCanvas

A vector drawing tool that allows the user to create art on a spherical canvas, similar to a [photo sphere](https://en.wikipedia.org/wiki/VR_photography).

Initially the goal is a simple pen / pencil tool with uniform line thickness. Emphasis in early development will be on refining the appearance of the pen line to create a simple, pleasant, hand-penned look. Support for variable line thickness and other brush types is not in the scope of the first phase, and may not get any of my attention.

My intention is to use [three.js](https://threejs.org/) as a foundation, and the [curve-fitting algorithm from jSignature](http://willowsystems.github.io/jSignature/%2523%252Fabout%252Flinesmoothing%252F.html) to convert cursor movement to [cubic bezier curves](https://threejs.org/docs/#api/extras/curves/CubicBezierCurve), modified to follow the surface of a sphere.

I will then add an eraser tool capable of removing partial lines, even severing a line partway between two bezier control points.

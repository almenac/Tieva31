export function rotateTransform(angles) {
	// Create the rotation specification string for the style.
	let rotation = "rotateX(" + angles[0] + "deg)"; 
	rotation += "rotateY(" + angles[1] + "deg)";
	rotation += "rotateZ(" + angles[2] + "deg)";
	return rotation;
}

export function filterStyle(color) {
	let filter = "drop-shadow(8px 8px 10px " + color + ")";
	return filter;
}

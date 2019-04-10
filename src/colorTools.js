const colorPattern = new RegExp("#[0-9a-f]{0,6}");
/**
  * This function returns true is the given string
  * matches the colorPattern (regular expression)
  * matching hex style css color strings (#ffffff and the like).
  */
export function isColorString(s) {
	// This regexp is used to validate the color string
	let match = s.match(colorPattern);
	if (match != null && match[0].length === s.length)
		return true;
	return false;
}

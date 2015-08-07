/* Converts conky configs (no lua, of course) to HTML for use. */
/* Mainly intended for quick porting of conky to this.         */

var conky_cols = ["#000000",  // 0
				  "#000000",  // 1
				  "#000000",  // 2
				  "#000000",  // 3
				  "#000000",  // 4
				  "#000000",  // 5
				  "#000000",  // 6
				  "#000000",  // 7
				  "#000000",  // 8
				  "#000000"]; // 9

function conky_file(file) {
	
}

function conky_cfgline(str) {
	var spaced = str.toString().replace(/\s+/g, ' ').split(' ');

	if (spaced[0] === "alignment") {
		wm_align(spaced[1]);
	} else if (spaced[0] === "gap_x") {
		offset_x(parseInt(spaced[1], 10));
	} else if (spaced[0] === "gap_y") {
		offset_Y(parseInt(spaced[1], 10));
	} else if (spaced[0] === "TEXT") {
		return 1;
	}

	return 0;
}

function conky_displine(str) {

}

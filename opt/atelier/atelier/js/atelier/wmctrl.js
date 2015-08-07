function wm_desktopwin() {
	require('child_process').spawn('wmctrl', [ '-F', '-r', 'Atelier', '-b', 'add,below' ]);
	require('child_process').spawn('wmctrl', [ '-F', '-r', 'Atelier', '-b', 'add,skip_taskbar' ]);
	require('child_process').spawn('wmctrl', [ '-F', '-r', 'Atelier', '-b', 'add,skip_pager' ]);
	require('child_process').spawn('wmctrl', [ '-F', '-r', 'Atelier', '-b', 'add,sticky' ]);
}

var current_align = 8;
var useless_gaps = 1; // Useless gaps. ;P
var off_x = 0;
var off_y = 0;

function wm_align(type) {
	if (type === undefined) {
		type = current_align;
	}

	/* There are nine alignment types. */
	/* left, right, top, bottom, left-top, left-bottom, right-top, right-bottom, center */

	var to_x = win.x;
	var to_y = win.y;

	if (type === "left" || type === "left_middle" || type === "lm" || type === 0) {
		current_align = 0;
		to_x = 0 + off_x;
		to_y = ((screen.height / 2) - (win.height / 2));
	} else if (type === "right" || type === "right_middle" || type === "rm" || type === 1) {
		current_align = 1;
		to_x = (screen.width - win.width) - (off_x+(useless_gaps*5));
		to_y = (screen.height / 2) - (win.height / 2);
	} else if (type === "top" || type === "top_middle" || type === "tm" || type === 2) {
		current_align = 2;
		to_x = (screen.width / 2) - (win.width / 2);
		to_y = 0 + off_y;
	} else if (type === "bottom" || type === "bottom_middle" || type === "bm" || type === 3) {
		current_align = 3;
		to_x = (screen.width / 2) - (win.width / 2);
		to_y = (screen.height - win.height) - (off_y+(useless_gaps*5));
	} else if (type === "left-top" || type === "top_left" || type === "tl" || type === 4) {
		current_align = 4;
		to_x = 0 + (off_x+(useless_gaps*5));
		to_y = 0 + (off_y+(useless_gaps*5));
	} else if (type === "left-bottom" || type === "bottom_left" || type === "bl" || type === 5) {
		current_align = 5;
		to_x = 0 + (off_x+(useless_gaps*5));
		to_y = (screen.height - win.height) - (off_y+(useless_gaps*5));
	} else if (type === "right-top" || type === "top_right" || type === "tr" || type === 6) {
		current_align = 6;
		to_x = (screen.width - win.width) - (off_x+(useless_gaps*5));
		to_y = 0 + (off_y+(useless_gaps*5));
	} else if (type === "right-bottom" || type === "bottom_right" || type === "br" || type === 7) {
		current_align = 7;
		to_x = (screen.width - win.width) - (off_x+(useless_gaps*5));
		to_y = (screen.height - win.height) - (off_y+(useless_gaps*5));
	} else if (type === "center" || type === "middle_middle" || type === "mm" || type === 8) {
		current_align = 8;
		to_x = (screen.width / 2) - (win.width / 2);
		to_y = (screen.height / 2) - (win.height / 2);
	}

	win.x = to_x;
	win.y = to_y;
}

function offset_x(off) {
	off_x = off;
	wm_align();
}

function offset_y(off) {
	off_y = off;
	wm_align();
}

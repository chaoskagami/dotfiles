/* ======================================= */
/* You shouldn't edit anything below here. */
/* This file isn't meant to be adjusted.   */
/* ======================================= */

fs = require('fs');
gui = require('nw.gui');
win = gui.Window.get();
os = require('os');

sample_rate = 2000;

eval(fs.readFileSync("js/jquery-2.min.js")+''); // Make damned sure that jQ is available.

eval(fs.readFileSync("js/atelier/wmctrl.js")+'');
eval(fs.readFileSync("js/atelier/format.js")+'');
eval(fs.readFileSync("js/atelier/html.js")+'');
eval(fs.readFileSync("js/atelier/ticker.js")+'');

eval(fs.readFileSync("js/atelier_main.js")+'');

eval(fs.readFileSync("js/atelier/unit.js")+'');
eval(fs.readFileSync("js/atelier/cpu.js")+'');
eval(fs.readFileSync("js/atelier/arch.js")+'');
eval(fs.readFileSync("js/atelier/disk.js")+'');
eval(fs.readFileSync("js/atelier/entropy.js")+'');
eval(fs.readFileSync("js/atelier/mem.js")+'');
eval(fs.readFileSync("js/atelier/net.js")+'');
eval(fs.readFileSync("js/atelier/top.js")+'');

var window_set = false;
function window_size_set() {
	win.resizeTo($("body").width(),
				 $("body").height());
	position();
}

function update() {
	$("#content").empty();
	$("#content").append( $.parseHTML(main()) );
	if (!window_set) {
		window_size_set();
		window_set = true;
	}
	++cycles_done;
}

setInterval(update, sample_rate);

win.setVisibleOnAllWorkspaces(true);
win.setShowInTaskbar(false);

gui.App.clearCache();

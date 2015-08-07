
/* ======================================= */
/* Main is a function which takes no       */
/* arguments and returns a string of       */
/* processed HTML.                         */
/* ======================================= */

// The rate at which the system monitor updates.
sample_rate = 2000;

// Which disks to show in frags/disk
disks = ["/", "/home"];

include_cache = false;

// Import all of the frags.
eval(fs.readFileSync("js/frags/info.js")+'');
eval(fs.readFileSync("js/frags/ram.js")+'');
eval(fs.readFileSync("js/frags/temp.js")+'');
eval(fs.readFileSync("js/frags/cpu.js")+'');
eval(fs.readFileSync("js/frags/entropy.js")+'');
eval(fs.readFileSync("js/frags/disk.js")+'');
eval(fs.readFileSync("js/frags/net.js")+'');
eval(fs.readFileSync("js/frags/fire.js")+'');
eval(fs.readFileSync("js/frags/glsa.js")+'');
eval(fs.readFileSync("js/frags/top.js")+'');
eval(fs.readFileSync("js/frags/update.js")+'');

// This function is called to apply window properties.
// Because windows are sized dynamically, don't dump these
// outside of the function here - it won't work correctly.
function position() {
	wm_desktopwin(); // Force below everything.
	wm_align("right-bottom");
}

function main() {
	var ret_str = "" +
		table(1) +
			row(1, 150) +
				col(1, 210) +

					frag_info() +
					hr() +

					frag_net() +
					hr() +

					frag_entropy() +

				col(0, 210) +

					frag_disk() +
					hr() +

					frag_ram() +

				col(0, 210) +

					frag_top() +

				col(0, 210) +

					frag_cpu() +
					hr() +

					frag_temp() +

				col(0, 210) +

					frag_glsa() +

				col(0, 210) +

					frag_update() +

				col(-1, 210) +
			row(0) +
		table() +
		"";

	return ret_str;
}

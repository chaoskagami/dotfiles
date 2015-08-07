function frag_info() {
	var up_s = os.uptime();
	var up_m = Math.floor(up_s / 60);
	var up_h = Math.floor(up_m / 60);
	var up_d = Math.floor(up_h / 24);
	var up_w = Math.floor(up_d / 7);
	up_s = Math.floor(up_s % 60);
	up_m = Math.floor(up_m % 60);
	up_h = Math.floor(up_h % 24);
	up_d = Math.floor(up_d % 7);

	var uptime = "";
	if (up_w > 0) {
		uptime = uptime + up_w + "w";
	}
	if (up_d > 0) {
		uptime = uptime + up_d + "d";
	}
	if (up_h > 0) {
		uptime = uptime + up_h + "h";
	}
	if (up_m > 0) {
		uptime = uptime + up_m + "m";
	}
	if (up_s > 0) {
		uptime = uptime + up_s + "s";
	}

	return "<div style='max-width:210px;overflow:hidden;'>" +
		line_lr("<b><i>Info</i></b>",
				os.hostname()) +
		line_lr("<i>Kernel</i>",
				os.type() + " " + os.release() + " " + arch()) +
		line_lr("<i>Uptime</i>",
				uptime) +
		"</div>";
}

function frag_temp() {
	var path = "/sys/class/hwmon/";
	path = "/tmp/hwmon/"
	var monitor = "hwmon1";
	var temp1   = parse_sysdata(path, monitor, 1);
	var temp2   = parse_sysdata(path, monitor, 2);
	var temp3   = parse_sysdata(path, monitor, 3);

	return "" +
		line_lr("<b><i>Coretemp</i></b>",
				"<font color='#ff0000'><b>☠</b> " + (temp1[1] / 1000) + "°C</font>    " +
				"<font color='#ffff00'><b>⚠</b> " + (temp1[2] / 1000) + "°C</font>"   ) +
		line_lr("TEMP0", safe_temp(temp1)) +
		line_lr("TEMP1", safe_temp(temp2)) +
		line_lr("TEMP2", safe_temp(temp3));
}

function parse_sysdata(path, monitor, temp) {
	return [ parseInt(fs.readFileSync(path + monitor + "/temp"+temp+"_input")+'', 10),
			 parseInt(fs.readFileSync(path + monitor + "/temp"+temp+"_crit")+'', 10),
			 parseInt(fs.readFileSync(path + monitor + "/temp"+temp+"_max")+'', 10) ]
}

function safe_temp(temp) {
	if (temp[0] >= temp[1]) {
		return "<font color='#ff0000'><b>☠</b>" +
		       (temp[0] / 1000) +
		       "°C</font>";
	}
	else if (temp[0] >= temp[2]) {
		return "<font color='#ffff00'><b>⚠</b>" +
		       (temp[0] / 1000) +
		       "°C</font>";
	}
	return (temp[0] / 1000) + "°C";
}

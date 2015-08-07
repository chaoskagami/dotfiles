function frag_net() {
	var ifdata = get_ifaces();
	var active = get_active_iface();

	var iface_list = "";
	for (var i = 0; i < ifdata.length; i++) {
		if (ifdata[i] === active) {
			iface_list = iface_list + "[*" + ifdata[i] + "] "
		} else {
			iface_list = iface_list + ifdata[i] + " "
		}
	}

	var path = "/sys/class/net/"+active+"/statistics/";
	// If you use grsec like me, you might not be able to read it.
	// I don't get why number of bytes tx/rx'd is restricted, honestly.
	// I personally have a shell script which copies the values repeatedly to
	// /tmp/netstat
	path = "/tmp/netstat/"+active+"/statistics/";

	var tx_bytes = downconvert(fs.readFileSync(path + "tx_bytes"), 1);
	var rx_bytes = downconvert(fs.readFileSync(path + "rx_bytes"), 1);

	var tx_str = tx_bytes[0] + tx_bytes[1];
	var rx_str = rx_bytes[0] + rx_bytes[1];

	return "" +
		line_lr("<b><i>Network</i></b>", iface_list) +
		line_lr("[<b>&uarr;</b>] " + tx_str, rx_str + " [<b>&darr;</b>]");
}

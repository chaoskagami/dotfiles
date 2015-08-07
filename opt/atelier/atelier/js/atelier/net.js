function get_ifaces() {
	// os.networkInterfaces is innacurate. It doesn't show all interfaces,
	// only ones which are UP.
	// Unfortunately, this behaves incorrectly with tunnels so we rely on parsing
	// ifconfig
	var keys = [];
	var ret = require('child_process').spawnSync('ifconfig', ['-s']);
	if (ret.status === 0) {
		var buffer = ret.stdout.toString().split('\n');
		for (var i = 1; i < buffer.length; i++) {
			var iface = buffer[i].replace(/\s+/g, ' ').split(' ');
			keys[i-1] = iface[0];
		}
	}

	return keys;
}

function get_active_iface() {
	var ret = require('child_process').spawnSync('ip', ['route', 'list']);
	if (ret.status === 0) {
		var buffer = ret.stdout.toString().split('\n');

		for (var i = 0; i < buffer.length; i++) {
			// 0.0.0.0/1 - VPN is overriding default
			// default   - Otherwise this is the internet exit.
			var route = buffer[i].replace(/\s+/g, ' ').split(' ');
			if (route[1] === "via") {
				if (route[0] === "0.0.0.0/1" || route[0] === "default") {
					// Find "dev". Next param is the iface.
					for (var j = 2; j < (route.length - 1); j++) {
						if (route[j] === "dev") {
							return route[j+1];
						}
					}
				}
			}
		}
	}
}

// Controls whether cache is included in use calculations by default.

function memfree() {
	if (include_cache === null || include_cache) {
		return os.freemem(); // Couldn't get precise exluding cache. Fallback.
	} else {
		return (os.freemem() + memcache());
	}
}

function memused() {
	var mem = os.totalmem();
	var free = memfree();

	return (mem - free);
}

function memcache() {
	var ret = require('child_process').spawnSync('free', ['-b']);

	if (ret.status === 0) {
		// type total used free shared buff/cache avail
		// 0    1     2    3    4      5          6-
		var data = (ret.stdout.toString().split('\n'))[1].replace(/[\s]+/g, ' ').split(' ');

		return parseInt(data[5], 10);
	}

	return 0;
}

function mem_free_perc() {
	var mem = os.totalmem();
	return (memfree() / mem) * 100;
}

function mem_used_perc() {
	var mem = os.totalmem();
	return (memused() / mem) * 100;
}

function mem_cache_perc() {
	var mem = os.totalmem();
	return (memcache() / mem) * 100;
}


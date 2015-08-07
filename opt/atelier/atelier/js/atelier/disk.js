function disk_free(disk) {
	if (disk === undefined) {
		return undefined;
	}
	
	var ret = require('child_process').spawnSync('df', ['-B1', disk]);

	if (ret.status === 0) {
		// diskname blocks usedblocks availblocks perc mounted
		var data = (ret.stdout.toString().split('\n'))[1].replace(/\s+/g, ' ').split(' ');

		return parseInt(data[3], 10);
	}
}

function disk_used(disk) {
	if (disk === undefined) {
		return undefined;
	}

	var ret = require('child_process').spawnSync('df', ['-B1', disk]);

	if (ret.status === 0) {
		// diskname blocks usedblocks availblocks perc mounted
		var data = (ret.stdout.toString().split('\n'))[1].replace(/\s+/g, ' ').split(' ');

		return parseInt(data[2], 10);
	}
}

function disk_size(disk) {
	if (disk === undefined) {
		return undefined;
	}

	var ret = require('child_process').spawnSync('df', ['-B1', disk]);

	if (ret.status === 0) {
		// diskname blocks usedblocks availblocks perc mounted
		var data = (ret.stdout.toString().split('\n'))[1].replace(/\s+/g, ' ').split(' ');

		return parseInt(data[1], 10);
	}
}

function disk_perc_free(disk) {
	if (disk === undefined) {
		return undefined;
	}

	var ret = require('child_process').spawnSync('df', ['-B1', disk]);

	if (ret.status === 0) {
		// diskname blocks usedblocks availblocks perc mounted
		var data = (ret.stdout.toString().split('\n'))[1].replace(/\s+/g, ' ').split(' ');

		return parseInt(data[3], 10) / parseInt(data[1], 10) * 100;
	}
}

function disk_perc_used(disk) {
	if (disk === undefined) {
		return undefined;
	}

	var ret = require('child_process').spawnSync('df', ['-B1', disk]);

	if (ret.status === 0) {
		// diskname blocks usedblocks availblocks perc mounted
		var data = (ret.stdout.toString().split('\n'))[1].replace(/\s+/g, ' ').split(' ');

		return parseInt(data[2], 10) / parseInt(data[1], 10) * 100;
	}
}


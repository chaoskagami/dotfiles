function top_split(number) {
	if(number === undefined) {
		number = 0;
	}
	var ret = (require('child_process')).spawnSync('ps', [ 'auxk%cpu' ]);

	if (ret.status === 0) {		
		var top	= ret.stdout.toString().split('\n');
		if ( number > (top.length - 1) ) {
			return "";
		}

//		return top[top.length - 2].replace(/\s+/g, ' ').split(' ');

		return top[top.length - 2 - number].toString().replace(/\s+/g, ' ').split(' ');
	}
}

// USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND
// 0    1   2    3    4   5   6   7    8     9    10
function top_pid(number) {
	return top_split(number)[1];
}

function top_cpup(number) {
	return top_split(number)[2];
}

function top_memp(number) {
	return top_split(number)[3];
}

function top_cmd(number) {
	var long_cmd = top_split(number)[10];
	return long_cmd.replace(/.+\//, '');
}

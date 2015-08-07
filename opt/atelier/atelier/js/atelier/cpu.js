// Uses a callback to calculate CPU usage, and fetches from the last calculation.

var current_cpu_use = [];
var last_stat = (fs.readFileSync("/proc/stat")+'').split('\n');
var system_cpus = 0;

function cpu_stats_sampler() {
	var this_stat = (fs.readFileSync("/proc/stat")+'').split('\n');

	var cpu_count = 0;
	var a = [];
	var b = [];
	for (var i = 0; i < this_stat.length; i++) {
		var tmp = this_stat[i].split(' ');

		if (tmp[0].indexOf("cpu") > -1) {
			cpu_count++;
			a[tmp[0]] = tmp;
			b[tmp[0]] = last_stat[i].split(' ');
		}
	}
	system_cpus = cpu_count - 1;

	// Active = user + nice + system + irq + softirq + steal + guest + guest_nice
	// Idle   = idle + iowait

	// Proc format: [cpuN] user nice system idle iowait irq softirq steal guest guest_nice
	//              0      1    2    3      4    5      6   7       8     9     10

	var proc_a = parseInt(a["cpu"][1], 10) + parseInt(a["cpu"][2], 10) + parseInt(a["cpu"][3], 10) +
				 parseInt(a["cpu"][6], 10) + parseInt(a["cpu"][7], 10) + parseInt(a["cpu"][8], 10) +
				 parseInt(a["cpu"][9], 10) + parseInt(a["cpu"][10], 10);
	var idle_a = proc_a + parseInt(a["cpu"][4], 10) + parseInt(a["cpu"][5], 10);

	var proc_b = parseInt(b["cpu"][1], 10) + parseInt(b["cpu"][2], 10) + parseInt(b["cpu"][3], 10) +
				 parseInt(b["cpu"][6], 10) + parseInt(b["cpu"][7], 10) + parseInt(b["cpu"][8], 10) +
				 parseInt(b["cpu"][9], 10) + parseInt(b["cpu"][10], 10);
	var idle_b = proc_b + parseInt(b["cpu"][4], 10) + parseInt(b["cpu"][5], 10);

	if (idle_b - idle_a === 0) {
		current_cpu_use["cpu"] = 0;
	}
	else {
		current_cpu_use["cpu"] = (proc_b - proc_a) / (idle_b - idle_a);
	}

	for (var i = 0; i < cpu_count - 1; i++) {
		// delta(1 + 2 + 3) / delta(1 + 2 + 3 + 4)

		var proc_a = parseInt(a["cpu" + i.toString()][1], 10) + parseInt(a["cpu" + i.toString()][2], 10) + parseInt(a["cpu" + i.toString()][3], 10) +
					 parseInt(a["cpu" + i.toString()][6], 10) + parseInt(a["cpu" + i.toString()][7], 10) + parseInt(a["cpu" + i.toString()][8], 10) +
					 parseInt(a["cpu" + i.toString()][9], 10) + parseInt(a["cpu" + i.toString()][10], 10);
		var idle_a = proc_a + parseInt(a["cpu" + i.toString()][4], 10) + parseInt(a["cpu" + i.toString()][5], 10);

		var proc_b = parseInt(b["cpu" + i.toString()][1], 10) + parseInt(b["cpu" + i.toString()][2], 10) + parseInt(b["cpu" + i.toString()][3], 10) +
					 parseInt(b["cpu" + i.toString()][6], 10) + parseInt(b["cpu" + i.toString()][7], 10) + parseInt(b["cpu" + i.toString()][8], 10) +
					 parseInt(b["cpu" + i.toString()][9], 10) + parseInt(b["cpu" + i.toString()][10], 10);
		var idle_b = proc_b + parseInt(b["cpu" + i.toString()][4], 10) + parseInt(b["cpu" + i.toString()][5], 10);

		if (idle_b - idle_a === 0) {
			current_cpu_use["cpu" + i.toString()] = 0;
		}
		else {
			current_cpu_use["cpu" + i.toString()] = ((proc_b - proc_a) / (idle_b - idle_a) * 100);
		}
	}

	last_stat = this_stat;
}

setInterval(cpu_stats_sampler, sample_rate);

function cpu(cpu_index, chop) {
	var ret = "cpu";

	if (cpu_index !== undefined) {
		ret = ret + cpu_index.toString();
	}
	if (chop === undefined) {
		chop = 0;
	}

	return fixed(current_cpu_use[ret], chop);
}

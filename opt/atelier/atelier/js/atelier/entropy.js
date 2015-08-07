function entropy_avail() {
	return fs.readFileSync("/proc/sys/kernel/random/entropy_avail");
}

function entropy_poolsize() {
	return fs.readFileSync("/proc/sys/kernel/random/poolsize");
}

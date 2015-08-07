/* Gets the system arch in a normal format. */
function arch() {
	var arch = os.arch();
	if (arch === "x64") {
		return "x86_64";
	} else if (arch === "ia32") {
		return "x86";
	}
	return arch;
}

function frag_cpu() {

	var ret = "";

	for (var i=0; i < system_cpus; i++) {
		ret = ret +
			line_lr("CPU"+i+" <font color='#00ffff'>(" + cpu(i) + "%)</font>",
				"<progress style='width: 120px;' value=\"" + cpu(i) + "\" max=\"100\"></progress>");
	}

	return ret;
}

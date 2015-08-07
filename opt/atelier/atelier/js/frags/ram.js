function frag_ram() {
	var memory  = [ downconvert(memused(), 2),
					downconvert(memfree(), 2),
					downconvert(os.totalmem(), 2) ];
	var memstrs = [ memory[0][0] + memory[0][1],
					memory[1][0] + memory[1][1],
					memory[2][0] + memory[2][1] ];

	var ret = "" +
		line_lr("<b><i>RAM</i></b> <font color='#00ffff'>(" + fixed(mem_used_perc()) + "%)</font>",
				memstrs[0] + " / " + memstrs[2] + " Used");

	if (include_cache === null || include_cache) {
		ret = ret + line_lr("", "<progress style='width: 90%;' value=\"" + mem_used_perc() + "\" max=\"100\">");
	} else {
		ret = ret + line_lr("Use", "<progress style='width: 90%;' value=\"" + mem_used_perc() + "\" max=\"100\">") +
			    line_lr("Cac", "<progress style='width: 90%;' value=\"" + mem_cache_perc() + "\" max=\"100\">");
	}

	return ret;
}

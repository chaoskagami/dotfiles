var pids_display_top = 7;

function frag_top() {
	var ret = "" +
		line_lr("<b><i>Processes (by CPU%)</i></b>", "<b><i>PID</i></b>");

	for(var i=0; i < pids_display_top; i++) {
		ret = ret +
			line_lr(ticker(22, top_cmd(i)), top_pid(i));

	}

	return ret;
}

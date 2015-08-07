var cycles_done = 0;

function ticker(disp_cnt, str) {
	if (disp_cnt > str.length) return str;

	var remain = cycles_done % (str.length - disp_cnt + 1);
	return str.substr(remain, disp_cnt);
}

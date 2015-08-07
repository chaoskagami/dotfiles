var check_interval = 12*60*1000; // 12 hours

var latest_kernel = "";

function kernel_fetch() {
	require('child_process').exec("basename $(wget https://www.kernel.org/ -q -O - | grep -A1 '<td id=\"latest_button\">' | sed -e '1d' -e 's/[[:space:]]*<a href=\"//g' -e 's/\".*//g' -e 's/linux-//') .tar.xz",
	function (error, stdout, stderr) {
		if (error !== null) {
			setTimeout(kernel_fetch, 5000); // Failed. Go again in five seconds.
		} else {
			latest_kernel = stdout;
			setTimeout(kernel_fetch, check_interval); // Schedule to refresh in interval.
		}
	});
}

var latest_grsec = "";

function grsec_fetch() {
	require('child_process').exec("basename $(wget -q https://grsecurity.net/download.php -O - | grep '/test' | sed -e 's/.*<a href=\"//' -e 's/\".*//' -e 's/grsecurity-//') .patch.sig",
	function (error, stdout, stderr) {
		if (error !== null) {
			setTimeout(grsec_fetch, 5000); // Failed. Go again in five seconds.
		} else {
			latest_grsec = stdout;
			setTimeout(grsec_fetch, check_interval); // Schedule to refresh in interval.
		}
	});
}

var latest_openmw = "";

function openmw_fetch() {
	require('child_process').exec("wget -q https://raw.githubusercontent.com/OpenMW/openmw/master/CHANGELOG.md -O - | sed -n '1p'",
	function (error, stdout, stderr) {
		if (error !== null) {
			setTimeout(openmw_fetch, 5000); // Failed. Go again in five seconds.
		} else {
			latest_openmw = stdout;
			setTimeout(openmw_fetch, check_interval); // Schedule to refresh in interval.
		}
	});
}

var latest_palemoon = "";

function palemoon_fetch() {
	require('child_process').exec("wget -q https://raw.githubusercontent.com/MoonchildProductions/Pale-Moon/master/browser/config/version.txt -O -",
	function (error, stdout, stderr) {
		if (error !== null) {
			setTimeout(palemoon_fetch, 5000); // Failed. Go again in five seconds.
		} else {
			latest_palemoon = stdout;
			setTimeout(palemoon_fetch, check_interval); // Schedule to refresh in interval.
		}
	});
}

var latest_wine = "";

function wine_fetch() {
	require('child_process').exec("wget winehq.org -O - | grep 'announce' | sed -n -e 's|[[:space:]]*<b><a href=\"/announce/||g' -e 's|\".*||g' -e '2p'",
	function (error, stdout, stderr) {
		if (error !== null) {
			setTimeout(wine_fetch, 5000); // Failed. Go again in five seconds.
		} else {
			latest_wine = stdout;
			setTimeout(wine_fetch, check_interval); // Schedule to refresh in interval.
		}
	});
}

kernel_fetch();
grsec_fetch();
openmw_fetch();
palemoon_fetch();
wine_fetch();

function frag_update() {
	return "<div style='overflow:hidden;'>" +
		"<b><i>Upstream versions</i></b>" +
		line_lr("<u>Linux Stable</u>",	ticker(14, latest_kernel)) +
		line_lr("<u>GRSecurity</u>",	ticker(14, latest_grsec)) +
		line_lr("<u>OpenMW</u>",		ticker(14, latest_openmw)) +
		line_lr("<u>Pale Moon</u>",		ticker(14, latest_palemoon)) +
		line_lr("<u>Wine Unstable</u>",		ticker(14, latest_wine)) +
		"</div>";
}

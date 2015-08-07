var page_glsa;

page_glsa = require('child_process').execSync("wget -q 'https://glsa.gentoo.org/glsa' -O - | sed -ne \"/<table class=/,/<\\/table>/p\" | sed 's|<a href=\".*\">||g' | sed 's|</a>||g' | sed '2,5d'");

function frag_glsa() {

	return "<b><i>Vulnerabilities</i></b>" +
		"<div style=\"height: 130px; overflow:hidden;\">" +
			page_glsa +
		"</div>" +
		"";
}

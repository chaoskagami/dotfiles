var page_fire;

$.get("http://tsun.dere/plainfire.html", function( data ) {
	page_fire = data;
});

function frag_fire() {

	return "" +
		"<div>" +
			page_fire +
		"</div>" +
		"";
}

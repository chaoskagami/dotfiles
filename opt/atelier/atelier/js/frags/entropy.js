function frag_entropy() {
	return "" +
		line_lr("<b><i>Entropy</i></b>",
				entropy_avail() + " / " + entropy_poolsize());
}

function col(state, size) {
	if (state === 1) {
		return "<td style='width: "+size+"px;max-width: "+size+"px;min-width: "+size+"px;'>";
	} else if (state === -1) {
		return "</td>";
	} else {
		return "</td>" +
			"<td style='width: "+size+"px;max-width: "+size+"px;min-width: "+size+"px;'>";
	}
}

function row(state, height) {
	if (state === 1) { // Open
		return "<tr style='height: "+height+"px;max-height: "+height+"px;min-height: "+height+"px;'>";
	} else {
		return "</tr>"; // Close
	}
}

function table(state) {
	if (state === 1) { // Open
		return "<table>";
	} else {
		return "</table>"; // Close
	}
}

function hr() {
	return "<hr>";
}

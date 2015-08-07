/* Converts to the smallest possible unit. */
/* Returns a array with the following:     */
/* arr[0] = value                          */
/* arr[1] = times reduced                  */
function div_unit(unit, index) {
	if (index === undefined) {
		index = 0;
	}
	var new_unit = unit / 1024;

	if (new_unit < 1.0) {
		var array = [];
		array[0] = unit;
		array[1] = index;
		return array;
	}
	else {
		return div_unit(new_unit, index+1);
	}
}

/* Given a number of reductions, returns a string suffix. */
function reduce_name(index) {
	var names = [];
	names[0] = "B";
	names[1] = "K";
	names[2] = "M";
	names[3] = "G";
	names[4] = "T";
	names[5] = "P"; // The chances of this are nil unless you're a datacenter, but meh.

	return names[index];
}

/* Returns strings, not numbers. */
function downconvert(unit, chop) {
	var array = div_unit(unit);
	array[0] = fixed(array[0], chop).toString();
	array[1] = reduce_name(array[1]);
	return array;
}

/* Shorthand. */
function fixed(number, chop) {
	if (chop === undefined) {
		chop = 0;
	}
	return parseFloat(number).toFixed(chop);
}

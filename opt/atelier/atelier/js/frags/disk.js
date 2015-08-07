function frag_disk() {
	var ret_str = "<b><i>Filesystems</i></b>";
	for (var i = 0; i < disks.length; i++) {
		var df = downconvert(disk_free(disks[i]), 1);
		var ds = downconvert(disk_size(disks[i]), 1);

		var df_str = df[0] + df[1];
		var ds_str = ds[0] + ds[1];
		var du_perc = disk_perc_used(disks[i]);

		ret_str = ret_str + 
		line_lr(disks[i],
				df_str + " / " + ds_str + " Free") +
		line_lr("",
				"<progress style='width: 90%;' value=\"" + du_perc + "\" max=\"100\">");
	}

	return ret_str;
}

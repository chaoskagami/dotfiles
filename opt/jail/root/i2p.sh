# DAEMONSTART="/bin/bash"
DAEMONSTART='source /etc/profile && cd /jailhome/data/i2p && source ./runplain.sh'

init() {
	# Mount base.
	mkdir -p i2p || die "mkroot"
	mount -o bind,ro ../base i2p || die "mntroot"
	
	# Mount java module.
	mkdir -p i2p/jailhome/java || die "mkmodjava"
	mount -o bind,ro ../mods/java i2p/jailhome/java || die "mntmodjava"

	# Mount i2p data.
	mkdir -p i2p/jailhome/data/i2p || die "mkmodi2p"
	mount -o bind,rw ../data/i2p i2p/jailhome/data/i2p || die "mntmodi2p"
}

deinit() {
	umount i2p/jailhome/data/i2p || die "umi2p"
	rmdir i2p/jailhome/data/i2p || die "rmi2p"

	umount i2p/jailhome/java || die "umjava"
	rmdir i2p/jailhome/java || die "rmjava"

	umount i2p || die "umi2p"
	rmdir i2p || die "rmi2p"
}


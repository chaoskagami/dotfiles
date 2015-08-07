#!/bin/sh

# Primary chroot attach script.

mount --bind /dev dev
mount -t devpts devpts dev/pts -o gid=5,mode=620
mount -t proc proc proc
mount -t sysfs sysfs sys
mount -t tmpfs tmpfs run

chroot . /usr/bin/env -i					\
    HOME=/root TERM="$TERM" PS1='\u:\w\$ ' 	\
    PATH=/bin:/usr/bin:/sbin:/usr/sbin     	\
    /bin/bash --login

umount run
umount sys
umount proc
umount dev/pts
umount dev

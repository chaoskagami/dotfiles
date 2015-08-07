#!/bin/sh

# For opening a second shell after enter-chroot.sh

chroot . /usr/bin/env -i					\
    HOME=/root TERM="$TERM" PS1='\u:\w\$ ' 	\
    PATH=/bin:/usr/bin:/sbin:/usr/sbin     	\
    /bin/bash --login


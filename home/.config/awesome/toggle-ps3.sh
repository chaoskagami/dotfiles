#!/bin/bash

if [ ! -e ~/.config/awesome/state ]; then
	echo -n 0 > ~/.config/awesome/state
fi

STATE=`cat ~/.config/awesome/state`

if [ "$STATE" == "0" ]; then
	echo -n 1 > ~/.config/awesome/state
	sudo /usr/local/bin/ps3drv start
	notify-send -t 1000 "Enabled Xbox Controller Emulation"
elif [ "$STATE" == "1" ]; then
	echo -n 0 > ~/.config/awesome/state
	sudo /usr/local/bin/ps3drv stop
	notify-send -t 1000 "Disabled Xbox Controller Emulation"
fi

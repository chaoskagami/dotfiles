#!/bin/bash

start() {
	exec ./nw --enable-transparent-visuals --disable-gpu atelier
}

stop() {
	killall nw
}

restart() {
	stop
	( start ) &
}

if [ "$1" == "start" ]; then
	( start ) &
elif [ "$1" == "stop" ]; then
	stop
elif [ "$1" == "restart" ]; then
	restart
else
	echo "start, stop, restart"
fi

exit 0

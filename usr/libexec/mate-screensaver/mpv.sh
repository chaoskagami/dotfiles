#! /bin/bash

## path to video
VIDEO=$HOME/Videos/screensaver.mp4

exec mpv \
--no-audio \
--loop=inf \
--really-quiet \
--no-audio \
--fs \
--no-stop-screensaver \
--wid=$XSCREENSAVER_WINDOW \
"$VIDEO"

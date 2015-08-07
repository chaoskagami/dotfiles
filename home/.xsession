#!/bin/sh

# This is the actual heavy lifter for loading up my 'desktop'.

# Just source profile. I use a custom way of having multiple versions
# of software that requires it; Those will be in the xbin directory.

source /etc/profile

###################################################
# This stuff comes from the default xinitrc.
# I only kept 'essential' things.

# merge in keymaps
if [ -f "$sysxkbmap" ]; then
    setxkbmap `cat "$sysxkbmap"`
    XKB_IN_USE=yes
fi

# xkb and xmodmap don't play nice together
if [ -z "$XKB_IN_USE" ]; then
    if [ -f "$sysmodmap" ]; then
       xmodmap "$sysmodmap"
    fi
fi

unset XKB_IN_USE

###################################################
# These are so my japanese IME is used.

export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export XMODIFIERS=@im=ibus

###################################################
# Starting up session programs.

# Compton is pretty, and incredibly lightweight. (Compiz sucks bad.)
compton -f -C -c -I 0.06 -O 0.065 -r 2 -l -4 -t -4 --detect-rounded-corners --dbe --vsync opengl --blur-background-fixed &

# I could probably do without this.
mate-settings-daemon &

# Run the IME. I actually only have MATE partially installed; there's no primary panel.
# Awesome also doesn't provide a 'panel' thus, -p disable removes the check.
ibus-daemon -drx -p disable &

# We forked ibus, but need it to be running before IME switch.
# 2s is USUALLY enough. Keep in mind that I'm using a SSD.
# FIXME - Switch out of japanese input by default.
sleep 2s;
ibus engine anthy

# Should probably just use xscreensaver.
mate-screensaver &

# Load WP.
. ~/.fehbg &

# Allow root to open windows.
xhost +local:

# Start my sysmon (it works like conky, basically.)
PWS=$(pwd)
cd ~/.atelier
./run.sh start &
cd $PWS
unset PWS

# Chain to awesome.
exec awesome


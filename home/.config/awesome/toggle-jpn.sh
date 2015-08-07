#!/bin/bash
if [ "`ibus engine`" == "xkb:us::eng" ]; then
	ibus engine anthy
	notify-send -t 1000 "Input: Anthy JPN"
elif [ "`ibus engine`" == "anthy" ]; then
	ibus engine xkb:us::eng
	notify-send -t 1000 "Input: XKB, US, ENG"
else
	ibus engine anthy
	notify-send -t 1000 "Input: Anthy JPN"
fi

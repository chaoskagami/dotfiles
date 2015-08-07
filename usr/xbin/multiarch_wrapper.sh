#!/bin/sh

# Does the exact same thing as LFS's multiarch_wrapper.c
# but is a shell script - thus a little more expensive,
# and can't be setuid but much easier to maintain.

suffix="64"

if [ ! "$USE_ARCH" = "" ]; then
	suffix="$USE_ARCH"
else
	if [ ! "$BUILDENV" = "" ]; then
		suffix="$BUILDENV"
	fi
fi

call="$0-$suffix"

exec "$call" "$@"

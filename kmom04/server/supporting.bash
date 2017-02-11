#!/bin/env bash

if [[ $LINUX_PORT ]]; then

	echo $LINUX_PORT

else

	echo "LINUX PORT NOT SET!"
	echo "Setting port now"
    LINUX_PORT=1337
	export LINUX_PORT
	set LINUX_PORT
	printf "LINUX_PORT in 'env': %s\n" "${LINUX_PORT}"
fi;

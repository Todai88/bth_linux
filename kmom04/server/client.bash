#!/bin/bash

if [[ $LINUX_PORT ]]; then

	printf "LINUX_PORT in 'env': %s\n" "${LINUX_PORT}"

else

	echo "LINUX PORT NOT SET!"
	echo "Defaulting to 1337"
    LINUX_PORT=1337
	export LINUX_PORT
	set LINUX_PORT
	printf "LINUX_PORT in 'env': %s\n" "${LINUX_PORT}"
fi;


if [[ $LINUX_SERVER ]]; then

	printf "LINUX_PORT in 'env': %s\n" "${LINUX_SERVER}"

else

	echo "LINUX_SERVER NOT SET!"
	echo "Defaulting to 178.62.110.17"
    LINUX_SERVER=178.62.110.17
	export LINUX_SERVER
	set LINUX_SERVER
	printf "LINUX_PORT in 'env': %s\n" "${LINUX_SERVER}"
fi;

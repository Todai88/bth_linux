#!/bin/env bash

if [[ $LINUX_PORT ]]; then
	
	echo $LINUX_PORT

else
	
	echo "LINUX PORT NOT SET!"
	echo "Setting port now"
	
	echo "LINUX_PORT=1337" >> /etc/environment

	cat /etc/environment | grep LINUX_PORT
fi;

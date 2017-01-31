#!/bin/bash

if [ "$1" == "reverse" ];
then
	if [ "$2" != "" ];
	then
		echo "$2" | rev
	else
		echo "Empty argument, try again!"
	fi;
fi; 

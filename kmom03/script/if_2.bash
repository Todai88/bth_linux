#!/bin/bash

if [ "$1" -eq 5 ];
then
	echo "Same!";
else
	if (( $1 > 5));	   
	then	
		echo "Higher!";
	else
		echo "Lower!";
	fi;
fi;	

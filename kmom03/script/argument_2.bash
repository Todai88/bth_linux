#!/bin/bash


out="1"

if [ "$1" == "d" ];
then
	echo "Current date: $(date +%d-%m-%y)"; 


elif [ "$1" == "n" ];
then

	for i in {2..20}
	do
		out="$out, $i"
 	done

	echo "$out"

elif [ "$1" == "a" ];
then

	if [ "$2" != "" ];
	then
		echo "First: $1, Second: $2"
	else
		echo "Missing argument!"

	fi;
else 
	echo "Unkown or empty argument(s)!" 
fi; 

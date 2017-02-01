#!/bin/bash

is_prime () { 
	if [ "$1" == 1 ];
		then
		return 1
	fi;

	for (( i=2; i<$1; i++ ))
	do
		if (( $1%2 == 0));
			then
			return 1
		fi;
	done;
	return 0;
}

for j in {1..20}
do
	is_prime "$j"
	if [ $? == 1 ];
		then
			echo "$j is not a prime!"
		else
			echo "$j is a prime!"
	fi;
done;
# if [ "$1" == "factors" ];
# 	then
# 	for var in "$@"
# 	do
# 		out="$var: "


# fi;

#!/bin/bash
re='^[0-9]+$' #numerical numbers
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

if [ "$1" == "reverse" ];
then
	if [ "$2" != "" ];
	then
		echo "$2" | rev
	else
		echo "Empty argument, try again!"
	fi;

elif [ "$1" == "factors" ];
then
	final_out=""
	while [ "$2" != "" ];
	do
		out="$2: "
		if [[ $2 =~ $re ]]; then
			for ((j=2; j<$2; j++))
				do
					is_prime "$j"
					if [ $? != 1 ];
						then
							if (( $2%$j == 0));
								then
									out="$out $i"
							fi;
					fi;
				done
		else
			out="$out non-numerical parameter."
		fi;
		final_out="${final_out}"$'\n'"${out}"
		shift
	done
	echo "$final_out"

elif [ "$1" == "starwars" ]; then
	telnet towel.blinkenlights.nl
fi;

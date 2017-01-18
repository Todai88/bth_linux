#!/bin/bash

out="" 

for i in {10..20}
do
	if ((i == 10));
	then
		out="$i"
	else
		out="$out, $i"	
	fi;

	echo "$i"
done

echo "eller: $out"

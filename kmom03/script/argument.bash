

#!/bin/bash


out=""

#Loop until parameters are used up

while [ "$1" != "" ]; do

	out="$out $1"

	shift
	
done

echo "$out" 



#!/bin/bash

DOM=$(date +%u)
DOW=""

case $DOM in
[1]*)
	DOW="Monday"
;;
[2]*) 
	DOW="Tuesday"
;;
[3]*)
	DOW="Wednesday"
;; 
[4]*) 

	DOW="Thursday"
;;
[5]*)
	DOW="Friday"
;;
[6]*)
	DOW="Saturday"	
;;
[7]*)
	DOW="Sunday"
;;
esac

echo "Today is $DOW"
 

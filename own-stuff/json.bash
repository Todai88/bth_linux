#!/bin/bash

json_object=$(curl -s 'http://quotes.stormconsultancy.co.uk/random.json')
#quote=$(jq -r '.quote' $json_object) 
#echo $quote 
quote=$(echo ${json_object} | jq .quote | sed -e 's/^"//' -e 's/"$//')
author=$(echo ${json_object} | jq .author)
count=${#quote}
echo "$quote" 
echo "$author"
echo "wc: $count" 

if((count > 80));
then
	quote=${quote:0:80}\n${quote:80:(count - 80)}	
else
	echo "lower"
fi
printf "$quote"  

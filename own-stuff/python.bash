#!/bin/bash

$(curl -s 'http://quotes.stormconsultancy.co.uk/random.json?callback=?' | jq -r '.quote') 

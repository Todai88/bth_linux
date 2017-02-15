#!/bin/bash


# Script name
SCRIPT=$( basename "$0" )

# Script version
VERSION="1.0.0a"



#
# Usage / help message.
#

function usage_help ()
{
	local txt=(
	"Use this script to:"
	""
	"1.		Test the service's routes."
	"2.		Test the 'sum' of an unspecified amount of numbers."
	"3.		Test the filter functionality (filter all numbers <= 42)."
	""
	"USAGE: $SCRIPT [options] <command> [arguments]"
	""
	"OPTIONS:"
	" --help, 	 -h			Print help."
	" --version, 	 -v			Print version."
	""
	"COMMAND: arguments in paranthesis ()"
	" hello	->	cURLs the '/' route.  		Expected result: 'Hello World.'"
	" html	  ->	cURLs the /index.html. 		Expected result: contents of index.html"
	" status	  ->	cURLs the /status route.	Expected result: contents of 'uname -a'."
	" sum	  ->	cURLs the /sum route.		Expected result: the sum of all numbers."
	" filter	  ->	cURLs the /filter route.	Expected result: returns an array of all numbers <= 42."
	" all	  ->	Runs all the above commands."
	)

	printf "%s\n" "${txt[@]}"
}

function incorrect_usage ()
{
	local message="$1"
	local txt=(
	"For an overview of the command, execute:"
	"$SCRIPT --help"
	)

	[[ $message ]] && printf "%s\n" "$message"

	printf "%s\n" "${txt[@]}"
}


function app-check_values()
{
if [[ $LINUX_PORT ]]; then

	printf "LINUX_PORT in 'env': %s\n" "${LINUX_PORT}"

else

	echo "LINUX PORT NOT SET!"
	echo "Defaulting to 1337"
    LINUX_PORT=1337
	export LINUX_PORT
	set LINUX_PORT
	printf "LINUX_PORT in 'env': %s\n" "${LINUX_PORT}"
fi;


if [[ $LINUX_SERVER ]]; then

	printf "LINUX_PORT in 'env': %s\n" "${LINUX_SERVER}"

else

	echo "LINUX_SERVER NOT SET!"
	echo "Defaulting to localhost"
    LINUX_SERVER=localhost
	export LINUX_SERVER
	set LINUX_SERVER
	printf "LINUX_PORT in 'env': %s\n" "${LINUX_SERVER}"
fi;
}


#
# app-hello.
# Simply cURLs the URL '/'
#

function app-hello()
{

	curl "${LINUX_SERVER}:${LINUX_PORT}/"

}


#
# app-html
# cURLs the URL on the '/index.html' route
#

function app-html()
{
		curl "${LINUX_SERVER}:${LINUX_PORT}/index.html"
}

#
# app-status
# cURLs the URL on the '/status' route.
#

function app-status()
{
		curl "${LINUX_SERVER}:${LINUX_PORT}/status"
}

#
# app-sum
# uses all the submitted arguments
# and loops over them, creating the
# paramaters.
#


function app-sum()
{
	final_out="?"
	while [ "$1" != "" ];
		do
			if [ "$2" == "" ]; then
				final_out+="$1"
			else
				final_out+="$1&"
			fi
			shift
		done

	curl "${LINUX_SERVER}:${LINUX_PORT}/sum${final_out}"
}

#
# app-filter
# loops over all the submitted
# arguments and creats
# the parameters for the cURL.
#

function app-filter()
{
	final_out="?"
	while [ "$1" != "" ];
		do
			if [ "$2" == "" ]; then
				final_out+="$1"
			else
				final_out+="$1&"
			fi
			shift
		done

	curl "${LINUX_SERVER}:${LINUX_PORT}/filter${final_out}"
}

#
# Checking and setting values.
#

app-check_values

#
# Main script-body, iterates through submitted parameters
#

while (( $# ))
do
	case "$1" in

		--help | -h)
			usage_help
			exit 0
		;;

		--version | -v)
			version
			exit 0
		;;

		hello 	\
		|	html \
		|	status \
		|	sum		\
		|	filter)
			command=$1
			shift
			app-"$command" "$@"
			exit 0
		;;

		*)
			incorrect_usage "Options/command not recognized."
			curl "${LINUX_SERVER}:${LINUX_PORT}/incorrect"
			exit 1
		;;
	esac
done

incorrect_usage
exit 1

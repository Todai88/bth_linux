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
	"1.		Help you reverse strings."
	"2.		Get the prime factors of numbers."
	"3.		Watch ASCII StarWars (ep IV)."
	""
	"USAGE: $SCRIPT [options] <command> [arguments]"
	""
	"OPTIONS:"
	" --help, 	 -h			Print help."
	" --version, 	 -v			Print version."
	""
	"COMMAND: arguments in paranthesis ()"
	" reverse(string s)		Reverses and prints string s"
	" factors(args)			Prints the primefactors of submitted arguments."
	" starwars()			Shows you an ASCII version of starwars over telnet."
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
			exit 1
		;;
	esac
done

incorrect_usage
exit 1

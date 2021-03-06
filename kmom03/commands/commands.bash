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

#
# Message to show when incorrect usage
#

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

#
# Message to display version
#

function version ()
{
	local txt=(
	"$SCRIPT version $VERSION"
	)

	printf "%s\n" "${txt[@]}"
}

#
# Helper function to check if number is prime
#

function is_prime () {
	flag=
	for (( i=2; i<=(($1 / 2)); i++ ))
	do
		if (( $1 % i == 0)); then
			flag=1
		fi
	done
	if [ ! "$flag" ]; then
			return 0
		else
			return 1
	fi
}

#
# Main assignment, reverses submitted string - if possible.
#

function app-reverse ()
{
	if [ "$1" ]; then
		echo "$1" | rev
	else
		echo "Empty argument, try again!"
	fi
}

#
# Main assignment, prints arguments' prime factors.
# Uses is_prime as helper function.
#

function app-factors ()
{
	re='^[0-9]+$' #numerical numbers
	final_out=""
	if [ "$1" == "" ]; then
		incorrect_usage "Please suply arguments! This counts as bad usage!"
		exit 1
	else
		while [ "$1" != "" ];
		do
			out="$1: "$'\t'
			FACTOR_ARRAY=()
			test_number=$1
			if [[ $1 =~ $re ]]; then
				found=
				for ((j=2; j<=test_number; j++))
					do
						if  is_prime "$j"; then

								if (( test_number % j == 0)); then
										test_number=$((test_number / j))
										FACTOR_ARRAY+=("$j")
										j=1
								fi

						fi
					done
					if ((${#FACTOR_ARRAY[@]} < 1 )); then
						FACTOR_ARRAY[0]="has no prime factorals."
					fi
			else
				out="$out non-numerical parameter."
			fi
			final_out="${final_out}"$'\n'"$out ${FACTOR_ARRAY[*]}"
			shift
		done
		echo "$final_out"
	fi
}

#
# Extra-assignment, for further credits.
#

function app-starwars ()
{
	telnet towel.blinkenlights.nl
}

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

		reverse 	\
		|	factors \
		|	starwars)
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

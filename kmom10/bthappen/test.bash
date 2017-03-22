#!/bin/bash


# Script name
SCRIPT=$( basename "$0" )

# Script version
VERSION="1.0.0a"
VERBOSE=false

#
# Usage / help message.
#

function usage_help ()
{
	local txt=(
	"Use this script to:"
	""
	"1.		Test all the server's routes."
	"2.		Test a specific route."
	""
	"USAGE: $SCRIPT [options] <command>"
	""
	"OPTIONS:"
	" --help, 	 -h			Print help."
	" --version, 	 -v			Print version."
    " --verbose                              Print more information about the test."
	""
	"COMMAND: verbose in paranthesis ()"
	" route	  ->	cURLs the '/' route.  		Expected result: 200  (list of routes)."
	" list	  ->	cURLs /room/list 		Expected result: 200  (list of all rooms)."
	" id	  ->	cURLs /room/view/id/:id  	Expected result: 200 (room with ':id')."
	" house	  ->	cURLs /room/view/house/:house	Expected result: 200 (all rooms of ':house')."
	" search	  ->	cURLs /room/search/:search 	Expected result: 200 (all rooms where ':search' matches any field)."
    " searchp  ->    cURLS /room/searchp/:search     Expected result: 200 (as 'search', but with priority algorithm)."
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

function version ()
{
	local txt=(
	"$SCRIPT version $VERSION"
	)

	printf "%s\n" "${txt[@]}"
}

function app-check_values()
{
	printf "%s\n\n" "###############################"

if [[ $LINUX_PORT ]]; then

	printf "LINUX_PORT already exists in 'env': %s\n" "${LINUX_PORT}"

else

	echo "LINUX PORT NOT SET!"
	echo "Defaulting to 1337"
    LINUX_PORT=1337
	export LINUX_PORT
	set LINUX_PORT
	printf "LINUX_PORT in 'env': %s\n" "${LINUX_PORT}"
fi;

	printf "\n%s\n\n" "------------#######------------"

if [[ $LINUX_SERVER ]]; then

	printf "LINUX_PORT already exists in 'env': %s\n" "${LINUX_SERVER}"

else

	echo "LINUX_SERVER NOT SET!"
	echo "Defaulting to localhost"
    LINUX_SERVER=localhost
	export LINUX_SERVER
	set LINUX_SERVER
	printf "LINUX_PORT in 'env': %s\n" "${LINUX_SERVER}"
fi;

printf "\n%s\n" "###############################"
}

#
# app-all
# runs all the commands
# described above
#

function app-all()
{
    printf "======================================================\n"
    app-route
    printf "\n======================================================\n"
    app-list
    printf "\n======================================================\n"
    app-id
    printf "\n======================================================\n"
    app-house
    printf "\n======================================================\n"
    app-search
    printf "\n======================================================\n"
    app-searchp
    printf "\n======================================================\n"
}

##
##
##  Test /
##  And print the response
##
##

function app-route ()
{
    res=$(curl -o /dev/null --silent --write-out '%{http_code}\n' ${LINUX_SERVER}:${LINUX_PORT}/)
    printf "\n\t\tTesting ROUTE\n\nURL:\t\t%s\nResponse-Code:\t%s" "${LINUX_SERVER}:${LINUX_PORT}/" "${res}"
	if [ "$VERBOSE" = true ] ; then
		res=$(curl -s ${LINUX_SERVER}:${LINUX_PORT}/)
		printf "\nResponse-Body: %s" "${res}"
	fi
}

##
##
##  Test /room/list
##  And print the response
##
##

function app-list ()
{
    res=$(curl -o /dev/null --silent --write-out '%{http_code}\n' ${LINUX_SERVER}:${LINUX_PORT}/room/list)
    printf "\n\t\tTesting LIST\n\nURL:\t\t%s\nResponse-Code:\t%s" "${LINUX_SERVER}:${LINUX_PORT}/" "${res}"
	if [ "$VERBOSE" = true ] ; then
		res=$(curl -s ${LINUX_SERVER}:${LINUX_PORT}/room/list)
		printf "\nResponse-Body: %s" "${res}"
	fi
}

##
##
##  Test /room/view/id/:id
##  And print the response (and JSON if verbose)
##
##

function app-id ()
{
    printf "\n\t\tTESTING ID\n\n"
    res=$(curl -o /dev/null --silent --write-out '%{http_code}\n' ${LINUX_SERVER}:${LINUX_PORT}/room/view/id/)
    printf "Starting with 'empty' :id\nURL:\t\t%s\nResponse-Code:\t%s" "${LINUX_SERVER}:${LINUX_PORT}/room/view/id/" "${res}"
	if [ "$VERBOSE" = true ] ; then
		res=$(curl -s ${LINUX_SERVER}:${LINUX_PORT}/room/view/id/)
		printf "\nResponse-Body: %s" "${res}"
	fi
    printf "\n--------\n"
    res=$(curl -o /dev/null --silent --write-out '%{http_code}\n' ${LINUX_SERVER}:${LINUX_PORT}/room/view/id/xxxxxxx)
    printf "Next testing 'faulty' :id\nURL:\t\t%s\nResponse-Code:\t%s" "${LINUX_SERVER}:${LINUX_PORT}/room/view/id/xxxxxxx" "${res}"
	if [ "$VERBOSE" = true ] ; then
		res=$(curl -s ${LINUX_SERVER}:${LINUX_PORT}/room/view/id/xxxxxxx)
		printf "\nResponse-Body: %s" "${res}"
	fi
    printf "\n--------\n"
    res=$(curl -o /dev/null --silent --write-out '%{http_code}\n' ${LINUX_SERVER}:${LINUX_PORT}/room/view/id/J4123)
    printf "Finally testing with 'correct' :id\nURL:\t\t%s\nResponse-Code:\t%s" "${LINUX_SERVER}:${LINUX_PORT}/room/view/id/J4123" "${res}"
	if [ "$VERBOSE" = true ] ; then
		res=$(curl -s ${LINUX_SERVER}:${LINUX_PORT}/room/view/id/J4123)
		printf "\nResponse-Body: %s" "${res}"
	fi
    printf "\n--------\n"
}

##
##
##  Test /room/view/house/:house
##  And print the response (and JSON if verbose)
##
##

function app-house ()
{
    printf "\n\t\tTESTING HOUSE\n\n"
    res=$(curl -o /dev/null --silent --write-out '%{http_code}\n' ${LINUX_SERVER}:${LINUX_PORT}/room/view/house/)
    printf "Starting with 'empty' :house\nURL:\t\t%s\nResponse-Code:\t%s" "${LINUX_SERVER}:${LINUX_PORT}/room/view/house/" "${res}"
	if [ "$VERBOSE" = true ] ; then
		res=$(curl -s ${LINUX_SERVER}:${LINUX_PORT}/room/view/house/)
		printf "\nResponse-Body: %s" "${res}"
	fi
    printf "\n--------\n"
    res=$(curl -o /dev/null --silent --write-out '%{http_code}\n' ${LINUX_SERVER}:${LINUX_PORT}/room/view/house/xxxxxxx)
    printf "Next testing 'faulty' :house\nURL:\t\t%s\nResponse-Code:\t%s" "${LINUX_SERVER}:${LINUX_PORT}/room/view/house/xxxxxxx" "${res}"
	if [ "$VERBOSE" = true ] ; then
		res=$(curl -s ${LINUX_SERVER}:${LINUX_PORT}/room/view/house/xxxxxxx)
		printf "\nResponse-Body: %s" "${res}"
	fi
    printf "\n--------\n"
    res=$(curl -o /dev/null --silent --write-out '%{http_code}\n' ${LINUX_SERVER}:${LINUX_PORT}/room/view/house/C-huset)
    printf "Finally testing with 'correct' :house\nURL:\t\t%s\nResponse-Code:\t%s" "${LINUX_SERVER}:${LINUX_PORT}/room/view/house/C-huset" "${res}"
	if [ "$VERBOSE" = true ] ; then
		res=$(curl -s ${LINUX_SERVER}:${LINUX_PORT}/room/view/house/C-huset)
		printf "\nResponse-Body: %s" "${res}"
	fi
    printf "\n--------\n"
}

##
##
##  Test /room/search/:search
##  And print the response (and JSON if verbose)
##
##

function app-search ()
{
    printf "\n\t\tTESTING NORMAL SEARCH\n\n"
    res=$(curl -o /dev/null --silent --write-out '%{http_code}\n' ${LINUX_SERVER}:${LINUX_PORT}/room/search/)
    printf "Starting with 'empty' :search\nURL:\t\t%s\nResponse-Code:\t%s" "${LINUX_SERVER}:${LINUX_PORT}/room/search/" "${res}"
	if [ "$VERBOSE" = true ] ; then
		res=$(curl -s ${LINUX_SERVER}:${LINUX_PORT}/room/search/)
		printf "\nResponse-Body: %s" "${res}"
	fi
    printf "\n--------\n"
    res=$(curl -o /dev/null --silent --write-out '%{http_code}\n' ${LINUX_SERVER}:${LINUX_PORT}/room/search/xxxxxxx)
    printf "Next testing 'faulty' :search\nURL:\t\t%s\nResponse-Code:\t%s" "${LINUX_SERVER}:${LINUX_PORT}/room/search/xxxxxxx" "${res}"
	if [ "$VERBOSE" = true ] ; then
		res=$(curl -s ${LINUX_SERVER}:${LINUX_PORT}/room/search/xxxxxxx)
		printf "\nResponse-Body: %s" "${res}"
	fi
    printf "\n--------\n"
    res=$(curl -o /dev/null --silent --write-out '%{http_code}\n' ${LINUX_SERVER}:${LINUX_PORT}/room/search/karlskrona)
    printf "Finally testing with 'correct' :search\nURL:\t\t%s\nResponse-Code:\t%s" "${LINUX_SERVER}:${LINUX_PORT}/room/search/karlskrona" "${res}"
	if [ "$VERBOSE" = true ] ; then
		res=$(curl -s ${LINUX_SERVER}:${LINUX_PORT}/room/search/karlskrona)
		printf "\nResponse-Body: %s" "${res}"
	fi
    printf "\n--------\n"
}

##
##
##  Test /room/searchp/:search
##  And print the response (and JSON if verbose)
##
##

function app-searchp ()
{
    printf "\n\t\tTESTING PRIORITY SEARCH\n\n"
    res=$(curl -o /dev/null --silent --write-out '%{http_code}\n' ${LINUX_SERVER}:${LINUX_PORT}/room/searchp/)
    printf "Starting with 'empty' :search\nURL:\t\t%s\nResponse-Code:\t%s" "${LINUX_SERVER}:${LINUX_PORT}/room/searchp/" "${res}"
	if [ "$VERBOSE" = true ] ; then
		res=$(curl -s ${LINUX_SERVER}:${LINUX_PORT}/room/searchp/)
		printf "\nResponse-Body: %s" "${res}"
	fi
    printf "\n--------\n"
    res=$(curl -o /dev/null --silent --write-out '%{http_code}\n' ${LINUX_SERVER}:${LINUX_PORT}/room/searchp/xxxxxxx)
    printf "Next testing 'faulty' :search\nURL:\t\t%s\nResponse-Code:\t%s" "${LINUX_SERVER}:${LINUX_PORT}/room/searchp/xxxxxxx" "${res}"
	if [ "$VERBOSE" = true ] ; then
		res=$(curl -s ${LINUX_SERVER}:${LINUX_PORT}/room/searchp/xxxxxxx)
		printf "\nResponse-Body: %s" "${res}"
	fi
    printf "\n--------\n"
    res=$(curl -o /dev/null --silent --write-out '%{http_code}\n' ${LINUX_SERVER}:${LINUX_PORT}/room/searchp/karlskrona)
    printf "Finally testing with 'correct' :search\nURL:\t\t%s\nResponse-Code:\t%s" "${LINUX_SERVER}:${LINUX_PORT}/room/searchp/karlskrona" "${res}"
	if [ "$VERBOSE" = true ] ; then
		res=$(curl -s ${LINUX_SERVER}:${LINUX_PORT}/room/searchp/karlskrona)
		printf "\nResponse-Body: %s" "${res}"
	fi
    printf "\n--------\n"
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

		--verbose )
			VERBOSE=true
			echo "$VERBOSE"
			command=$2
			app-"$command"
			exit 0
		;;

		route 	\
		|	list \
		|	id     \
		|	house	\
		|	search   \
        |   searchp	  )
			#
			# Checking and setting values.
			#
			app-check_values
			command=$1
			shift
			app-"$command" "$@"
			exit 0
		;;

		all )
			app-check_values
			app-"$1"
			exit 0
		;;

		*)
			echo "using '/incorrect'"
			echo " "
			echo "***Helper-String:***"
			incorrect_usage "Options/command not recognized."
			echo " "
			echo "*** Response-Header: ***"
			curl -I "${LINUX_SERVER}:${LINUX_PORT}/incorrect"
			echo "*** Response-Body: ***"
			curl "${LINUX_SERVER}:${LINUX_PORT}/incorrect"
			echo " "
			exit 1
		;;
	esac
done

incorrect_usage
exit 1

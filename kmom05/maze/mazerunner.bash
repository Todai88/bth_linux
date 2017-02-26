#!/bin/bash


# Script name
SCRIPT=$( basename "$0" )

# Script version
VERSION="1.0.0a"


#JSON variables

JSON=""
ID=0
MAZE=0
ROOM=0
MAPS[0]="maze-of-doom.json"
MAPS[1]="small-maze.json"

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
# app-init
#
# Initiates the game by curling the server.
# It then saves the ID to a file game_object.txt
#
#

function app-init()
{
    json_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}")
    ID=$(echo "${json_object}" | jq .gameid)
    MAZE=0
    ROOM=0
    user=$(uname)
    printf "\n\t\t\t%s%s\n\n%s\n" "Welcome " ${user} "Your ID is ${ID}, saving it to 'player_object.json'."
    #app-read_json
    app-write_json
}

#
# app-read_json
# reads the player_object.json file to get the current position of the player.
#

function app-read_json()
{
    JSON=$(cat player_object.json)
    ID=$(echo "${JSON}" | jq .id)
    MAZE=$(echo "${JSON}" | jq .maze)
    ROOM=$(echo "${JSON}" | jq .room)

    printf "\n%s\n\n" "Welcome back ${ID}. You are in room ${ROOM} in maze ${MAZE}"
}

function app-write_json()
{
    ID="${ID%\"}"
    ID="${ID#\"}"
    MAZE="${MAZE%\"}"
    MAZE="${MAZE#\"}"
    ROOM="${ROOM%\"}"
    ROOM="${ROOM#\"}"

    printf '{"id": %s,\n"maze": %s,\n"room": %s\n}' "${ID}" "\"${MAZE}\"" "${ROOM}"> player_object.json
    # JSON=$(jq \
    #        --arg id "${ID}" \
    #        --arg maze "${MAZE}" \
    #        --arg room "${ROOM}"  \
    #        '.["id"]=$id | .["maze"]=$maze | .["room"]=$room' \
    #        <player_object.json >player_object.json)

    #jq '.id="Sverige"' player_object.json

}

function app-maps()
{
    json_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/map")
    item="${json_object}"
    printf  "\n\nAvailable maps:\n\n1.\t%s\n2.\t%s\n\n%s"            \
            "$(echo $item | jq '.[0]')" "$(echo $item | jq '.[1]')" \
            "use 'mazerunner select # to chose a map'"
}

function app-select()
{
    printf "You selected...\n"
    case "$1" in
        1)
            MAZE=${MAPS[0]}
            echo $MAZE
            ROOM=0
            app-select_helper
        ;;
        2)
            MAZE=${MAPS[1]}
            ROOM=0
            echo $MAZE
            app-select_helper
        ;;

        *)
            printf "An unkown maze. \nPlease use 'mazerunner maps' to see available mazes!"
        ;;

    esac

}

function app-select_helper()
{

    json_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/${ID}/map/${MAZE}")
    app-write_json

}


function app-enter()
{

    ROOM=0
    json_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/${ID}/maze/${ROOM}")
    unparsed=$(echo "${json_object}" | jq .directions)
    app-parse_room $unparsed
    description=$(echo "${json_object}" | jq .description)
    description="${description%\"}"
    description="${description#\"}"
    printf "You are in room: ${ROOM}\nDescription: ${description}\n${unparsed}"
}

function app-parse_room()
{

    directions="You can go to: "
    west=$(echo "${unparsed}" | jq .west)
    east=$(echo "${unparsed}" | jq .east)
    north=$(echo "${unparsed}" | jq .north)
    south=$(echo "${unparsed}" | jq .south)
    if ! [[ $south == "\"-\"" ]] ; then
        directions+="South, ${south}. "
    fi
    if ! [[ $north == "\"-\"" ]] ; then
        directions+="North, ${north}. "
    fi
    if ! [[ $west == "\"-\"" ]] ; then
        directions+="West, ${west}. "
    fi
    if ! [[ $east == "\"-\"" ]] ; then
        directions+="East, ${east}. "
    fi
    unparsed=$directions
}

function app-info()
{
    json_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/${ID}/maze/${ROOM}")
    unparsed=$(echo "${json_object}" | jq .directions)
    app-parse_room $unparsed
    description=$(echo "${json_object}" | jq .description)
    description="${description%\"}"
    description="${description#\"}"
    printf "You are in room: ${ROOM}\nDescription: ${description}\n${unparsed}"
}


function app-go()
{
    case "$1" in
        north)
            app-test_direction $1
        ;;
        east)
            app-test_direction $1
        ;;

        south)
            app-test_direction $1
        ;;

        west)
            app-test_direction $1
        ;;

        *)
            printf "The direction \"$1\" is not supported.\n%s" \
                   "Try 'North', 'East', 'South', 'West'"
        ;;

    esac
}

function app-test_direction()
{

    echo "walking"
    json_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/${ID}/maze/${ROOM}")
    echo "waaaaalking..."
    new_room=$(echo "${json_object}" | jq .directions | jq ."${1}")
    echo "waaaaalkiiiiing...."
    if ! [[ $new_room == "\"-\"" ]] ; then
        app-change_room new_room
    else
        printf "Incorrect direction. Run 'mazerunner info' to see what directions you can go to."
    fi

}

function loop-test_direction()
{
	echo "${input}"
    echo "walking"
    json_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/${ID}/maze/${ROOM}")
    echo "waaaaalking..."
    new_room=$(echo "${json_object}" | jq .directions | jq ."${input}")
	echo $new_room
	echo ${json_object}
    echo "waaaaalkiiiiing...."
    if ! [[ $new_room == "\"-\"" ]] ; then
        loop-change_room new_room
    else
        printf "Incorrect direction. Run 'mazerunner info' to see what directions you can go to."
    fi

}
function loop-change_room()
{
    ROOM=$new_room
    json_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/${ID}/maze/${ROOM}")
    echo "done!"
    app-info
    app-write_json
}

function app-change_room()
{
    ROOM=$new_room
    json_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/${ID}/maze/${ROOM}")
    echo "done!"
    app-info
    app-write_json
}



function app-loop()
{

    printf "Initiating sequence..."

    #
    # init
    #

    json_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}")
    ID=$(echo "${json_object}" | jq .gameid)
    MAZE=0
    ROOM=0

    printf "\n\n\n\t\t\tWelcome to MAZERUNNER LOOOOOOOOOOOPER edition."

    printf "\n\nSetting up the maps for you...\n\n"

    json_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/map")
    item="${json_object}"
    printf  "\n\nAvailable maps:\n\n1.\t%s\n2.\t%s\n\n%s"            \
            "$(echo $item | jq '.[0]')" "$(echo $item | jq '.[1]')"


    printf "\n\nPlease select a map from the two.\n\n"
    read input

    case "${input}" in
        1)
            MAZE=${MAPS[0]}
            ROOM=0
			json_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/${ID}/map/${MAZE}")
		    app-info
        ;;
        2)
            MAZE=${MAPS[1]}
            ROOM=0
			json_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/${ID}/map/${MAZE}")
		    app-info
        ;;

        *)
            printf "An unkown maze. Exiting application."
            exit 1
        ;;

    esac

	flag=true
	input=""
	printf "\n\n\n"

	while [[ $flag == true ]]
	do
		printf "Enter command: ('help' for help, 'done' for quit)\n"
		read input

		case "${input}" in

			  north \
			| east   \
			| south   \
			| west)
				loop-test_direction input
			;;

			done)
				echo "Ending loop"
				flag=false

			;;

			help)
				echo "help"
			;;

			*)
				echo "Unkown command. Check 'help' for help!"
		esac
		printf "\n\n\n"
		input=""
	done
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
        init)
            app-check_values
            command=$1
            shift
            app-"$command" "$@"
            exit 0
        ;;

		info 	 \
		|	maps  \
		|	select \
		|	enter   \
        |   go  )
			#
			# Checking and setting values.
			#
            app-read_json
			app-check_values
			command=$1
			shift
			app-"$command" "$@"
			exit 0
		;;

		loop )
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

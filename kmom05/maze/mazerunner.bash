#!/bin/bash
#shellcheck disable=SC2086

# Script name
SCRIPT=$( basename "$0" )

# Script version
VERSION="1.0.0a"



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
    unparsed_csv_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}?type=csv")
	ID=$(echo "$unparsed_csv_object" | awk -F ',' '{print $2}')
	ID=$(echo "$ID" | sed -n 2p)
	echo "$ID"
    MAZE=0
    ROOM=0
    user=$(uname)
    printf "\n\t\t\tWelcome Your ID is %s. Saving it to 'player_object.txt'" "${user}" "${ID}"
    #app-read_json
    app-write_csv
}

#
# app-read_json
# reads the player_object.json file to get the current position of the player.
#

function app-read_csv()
{
    unparsed_csv_object=$(cat player_object.txt)
    ID=$(echo "${unparsed_csv_object}" |  awk -F ',' '{print $1}')
    ROOM=$(echo "${unparsed_csv_object}" |  awk -F ',' '{print $2}')

    printf "\n%s\n\n" "Welcome back ${ID}. You are in room ${ROOM}."
}

function app-write_csv()
{
    ID="${ID%\"}"
    ID="${ID#\"}"
    ROOM="${ROOM%\"}"
    ROOM="${ROOM#\"}"

    printf '%s,%s' "${ID}" "${ROOM}"> player_object.txt
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
    unparsed_csv_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/map?type=csv")
	one=$(echo "$unparsed_csv_object" | awk -F ',' '{print $1}')
	two=$(echo "$unparsed_csv_object" | awk -F ',' '{print $2}')
	one=$(echo "$one" |  sed -n 2p)
	two=$(echo "$two" |  sed -n 2p)
    printf  "\n\nAvailable maps:\n\n1 %s\n2 %s\n\n%s"            \
            "$one" \
		    "$two" \
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

    curl -s "${LINUX_SERVER}:${LINUX_PORT}/${ID}/map/${MAZE}" > /dev/null
    app-write_csv

}


function app-enter()
{

    ROOM=0
    unparsed=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/${ID}/maze/${ROOM}?type=csv")
	parsed_desc="$(echo "${unparsed}" | awk -F ',' '{print $2}')"
	parsed_desc="$(echo "${parsed_desc}" | sed -n 2p)"
	directions="$(echo "${unparsed}" | awk -F ',' '{print $3}' | cut -d' ' -f1-)"
    app-parse_room "$unparsed"
    description="${parsed_desc}"

    printf "\n\nYou are in room: %s\n\nDescription: %s\n\n%s\n\n" "${ROOM}" "${description}" "${unparsed}"
	app-write_csv
}

function app-parse_room()
{
	directions="You can go to: "
    west="$(echo "${unparsed}" | awk -F ',' '{print $3}')"
	west="$(echo "${west}" | sed -n 2p)"

    east="$(echo "${unparsed}" | awk -F ',' '{print $4}')"
	east="$(echo "${east}" | sed -n 2p)"

    south="$(echo "${unparsed}" | awk -F ',' '{print $5}')"
	south="$(echo "${south}" | sed -n 2p)"

    north="$(echo "${unparsed}" | awk -F ',' '{print $6}')"
	north="$(echo "${north}" | sed -n 2p)"

    if ! [[ $south == "-" ]] ; then
        directions+="South, ${south}. "
    fi
    if ! [[ $north == "-" ]] ; then
        directions+="North, ${north}. "
    fi
    if ! [[ $west == "-" ]] ; then
        directions+="West, ${west}. "
    fi
    if ! [[ $east == "-" ]] ; then
        directions+="East, ${east}. "
    fi
    unparsed=$directions
}

function app-info()
{
	unparsed=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/${ID}/maze/${ROOM}?type=csv")
	parsed_desc="$(echo "${unparsed}" | awk -F ',' '{print $2}')"
	parsed_desc="$(echo "${parsed_desc}" | sed -n 2p)"
	directions="$(echo "${unparsed}" | awk -F ',' '{print $3}' | sed -n 2p)"

    app-parse_room "$unparsed"
    description=$"${parsed_desc}"

	if [[ $description == *"exit"* ]]; then
		printf "You found the exit!\nI'm shutting down the game now. Well done! :)"
		exit 0
	fi
    printf "\n\nYou are in room: %s\n\nDescription: %s\n\n%s\n\n" "${ROOM}" "${description}" "${unparsed}"
}


function app-go()
{
    case "$1" in
        north)
            app-test_direction "$1"
        ;;
        east)
            app-test_direction "$1"
        ;;

        south)
            app-test_direction "$1"
        ;;

        west)
            app-test_direction "$1"
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
    unparsed_csv_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/${ID}/maze/${ROOM}?type=csv")
	if [[ $1 == "west" ]] ; then
		direction_val="$(echo "${unparsed_csv_object}" | awk -F ',' '{print $3}')"
		direction_val="$(echo "${direction_val}" | sed -n 2p)"
	fi

	if [[ $1 == "east" ]] ; then
		direction_val="$(echo "${unparsed_csv_object}" | awk -F ',' '{print $4}')"
		direction_val="$(echo "${direction_val}" | sed -n 2p)"
	fi

	if [[ $1 == "south" ]] ; then
		direction_val="$(echo "${unparsed_csv_object}" | awk -F ',' '{print $5}')"
		direction_val="$(echo "${direction_val}" | sed -n 2p)"
	fi

	if [[ $1 == "north" ]] ; then
		direction_val="$(echo "${unparsed_csv_object}" | awk -F ',' '{print $6}')"
		direction_val="$(echo "${direction_val}" | sed -n 2p)"
	fi

    echo "waaaaalking..."

    if ! [[ $direction_val == "-" ]] ; then
        app-change_room direction_val
    else
        printf "Incorrect direction. Run 'mazerunner info' to see what directions you can go to."
    fi

}

function loop-test_direction()
{

	echo "walking"
	unparsed_csv_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/${ID}/maze/${ROOM}?type=csv")
	if [[ $input == "west" ]] ; then
		direction_val="$(echo "${unparsed_csv_object}" | awk -F ',' '{print $3}')"
		direction_val="$(echo "${direction_val}" | sed -n 2p)"
	fi

	if [[ $input == "east" ]] ; then
		direction_val="$(echo "${unparsed_csv_object}" | awk -F ',' '{print $4}')"
		direction_val="$(echo "${direction_val}" | sed -n 2p)"
	fi

	if [[ $input == "south" ]] ; then
		direction_val="$(echo "${unparsed_csv_object}" | awk -F ',' '{print $5}')"
		direction_val="$(echo "${direction_val}" | sed -n 2p)"
	fi

	if [[ $input == "north" ]] ; then
		direction_val="$(echo "${unparsed_csv_object}" | awk -F ',' '{print $6}')"
		direction_val="$(echo "${direction_val}" | sed -n 2p)"
	fi

	echo "waaaaalking..."

	if ! [[ $direction_val == "-" ]] ; then
		app-change_room direction_val
	else
		printf "Incorrect direction. Run 'mazerunner info' to see what directions you can go to."
	fi

}


function loop-change_room()
{
    ROOM=$new_room
    echo "Finished!"
    app-info object
    app-write_csv object
}

function app-change_room()
{
	echo "$direction_val"
    ROOM=$direction_val
    echo "done!"
    app-info
    app-write_csv
}


function loop-help_message()
{
		printf "\n\n\n\t\t\t** HELP **"
		printf "\n\nAvailable commands:\t\tFuncitonality:\n\n"
		printf "help\t\t\t\tShows you this message."
		printf "\ndone/quit\t\t\tStops the loop, effectivitely shutting down program. (exit code 0, as expected)"
		printf "\nnorth/east/south/west\t\tMoves you in the direction you specified. Example: 'west' = moves your character west, if possible."

}

function app-loop()
{

    printf "\n\n\n\t\t\t===== INITIATING ====="

    #
    # init
    #

	unparsed_csv_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}?type=csv")
	ID=$(echo "${unparsed_csv_object}" |  awk -F ',' '{print $3}')
    MAZE=0
    ROOM=0
    user=$(uname)

    printf "\n\n\n\t\t\tWelcome to MAZERUNNER LOOOOOOOOOOOPER edition."

    printf "\n\nSetting up the maps for you...\n\n"

	unparsed_csv_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/map?type=csv")

	unparsed_csv_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/map?type=csv")
	one=$(echo "$unparsed_csv_object" | awk -F ',' '{print $1}')
	two=$(echo "$unparsed_csv_object" | awk -F ',' '{print $2}')
	one=$(echo "$one" |  sed -n 2p)
	two=$(echo "$two" |  sed -n 2p)
    printf  "\n\nAvailable maps:\n\n1 %s\n2 %s\n\n%s"            \
            "$one" \
		    "$two" \
            "use 'mazerunner select # to chose a map'"


    printf "\n\nPlease select a map from the two.\n\n"
    read input


	printf "\n\n\n\t\t\t==== B RDY SILLY HOOMAN. INITIATING SCARY MAZE. SHOW ME WHAT YOU GOT! ===="


    case "${input}" in
        1)
            MAZE=${MAPS[0]}
            ROOM=0
			unparsed_csv_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/${ID}/map/${MAZE}")
		    app-info
        ;;
        2)
            MAZE=${MAPS[1]}
            ROOM=0
			unparsed_csv_object=$(curl -s "${LINUX_SERVER}:${LINUX_PORT}/${ID}/map/${MAZE}")
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
		printf "Enter command: ('help' for help, 'done' or 'quit' for quit)\n"
		read input

		case "${input}" in

			  north \
			| east   \
			| south   \
			| west)
				loop-test_direction input
			;;

			"done")
				echo "Ending loop"
				flag=false

			;;

			quit)
				echo "Ending loop"
				flag=false
			;;

			help)
				loop-help_message
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
            app-read_csv
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

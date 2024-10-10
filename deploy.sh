#! /bin/bash

: '---- CONSTANTS ----'
COMPOSE_FILE="docker-compose.yaml"
BRANCH="main"
IHUB_PATH=~/Josa/Josa

set -e

# change path to the ihub working dir
function change_path(){
    cd $IHUB_PATH || exit
    echo "This is the current working dir: $IHUB_PATH"
}

# pull the latest changes from remote url
function pull_latest_changes() {
    echo "Pulling latest changes from the ${BRANCH} branch..."
    git pull origin ${BRANCH}
}

function check_docker_is_running(){
    if ! command docker >/dev/null 2>&1 || ! command -v docker compose &>/dev/null; then
        echo -e "Ensure docker and docker compose are installed on your system and running.\nExiting ...."
        exit 1

    else
        echo "Confirmed! docker is installed on your system ..."
    fi
}

# stop the existing containers
function stop_running_containers() {
    echo "Stopping the running containers ..."
    docker compose -f $COMPOSE_FILE down
    docker image prune -f
    echo "removed the old containers and daggling images ...."
}

function deploy() {
    if [ ! -f "$COMPOSE_FILE" ]; then
        echo -e "Docker Compose file '$COMPOSE_FILE' not found.\n Exiting..."
        exit 1

    else
        # finally deploy the application
        echo "Finally!. Your application is ready for deployment ..."
        docker compose -f ${COMPOSE_FILE} up -d --build
    fi

}

function main() {
    # change_path
    # pull_latest_changes
    check_docker_is_running
    stop_running_containers
    deploy
}

main
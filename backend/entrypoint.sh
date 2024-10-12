#! /bin/bash

function  migrate(){
    export FLASK_APP=src
    flask db migrate -m "perform migrations ..."
    flask db upgrade
}

function downgrade(){
    export FLASK_APP=src
    flask db downgrade
}

if [ "$DATABASE" == "postgres" ]; then
    echo "Waiting for postgres to start ..."

    while ! nc -z "$SQL_HOST" "$SQL_PORT"; do
        echo "waiting for a tcp connection ..."
        sleep 0.1

    done
    echo "postgresql started .."
fi

migrate
# downgrade

exec "$@"
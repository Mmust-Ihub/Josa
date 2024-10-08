#! /bin/bash

if [ "$DATABASE" == "postgres" ]; then
    echo "Waiting for postgres to start ..."
    
    while ! nc -z "$SQL_HOST" "$SQL_PORT"; do
        echo "waiting for a tcp connection ..."
        sleep 0.1

    done
    echo "postgresql started .."
fi

exec "$@"
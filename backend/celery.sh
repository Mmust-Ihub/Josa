#! /bin/bash

function start_celery(){
    echo "Starting celery ..."
    # celery -A celery_worker.celery worker --loglevel=info --logfile=app/logs/celery.log
    celery -A celery_worker.celery worker --loglevel=info

}

start_celery
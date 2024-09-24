import os
from decouple import config
from src import create_app

config = config("CONFIG")

app = create_app(config)
celery = app.extensions["celery"]

if __name__ == '__main__':
    celery.start()

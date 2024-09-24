import os
from decouple import config
from datetime import timedelta
class Config:
     SECRET_KEY = config("SECRET_KEY")
     UPLOAD_DIR = config("UPLOAD_DIR")

class DevConfig(Config):
     SQLALCHEMY_DATABASE_URI = config("DATABASE_URI")
     SQLALCHEMY_TIMEZONE = 'Africa/Nairobi'
     SQLALCHEMY_TRACK_MODIFICATION = False
     DEBUG = True
     JWT_SECRET_KEY = config("JWT_SECRET_KEY")
     JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
     JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=2)
     CORS_HEADERS = "Content-Type"

     # celery configs
     CELERY_BROKER_URL: str = config("CELERY_BROKER_URL")
     CELERY_RESULT_BACKEND: str = config("CELERY_RESULT_BACKEND")
     TASK_IGNORE_RESULT:bool = True # basically, we tell celery to igore results of the workers unless we


class TestConfig(DevConfig):
     SQLALCHEMY_DATABASE_URI = "sqlite:///database.db"
     SQLALCHEMY_TRACK_MODIFICATION = True
     TESTING = True

class ProdConfig(Config):
     pass


config_dict = {
     
     "dev": DevConfig,
     "test": TestConfig,
     "prod": ProdConfig
}
     
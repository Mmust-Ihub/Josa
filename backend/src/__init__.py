from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from src.config.config import config_dict
from src.models.database import Post, db, migrate, User
from src.auth.auth import auth
from src.views.posts import posts
from src.celery import celery_init_app
from src.views.admin import admin
from src.utils import utils

# from src.views.admin_profile import admin


""" A function for creating an application """


def create_app(config="dev"):

    app = Flask(__name__)
    app.config.from_object(config_dict[config])
    db.init_app(app=app)
    migrate.init_app(app=app)
    JWTManager(app)
    celery_init_app(app=app)
    required_headers = ["Content-Type", "Authorization"]
    CORS(
        app,
        resources={
            r"/*": {
                "origins": "*",
                "methods": ["GET", "POST", "PATCH", "DELETE"],
                "supports_credentials": True,
                "allow_headers": required_headers,
            }
        },
    )

    @app.before_request
    def before_any_request():
        utils.create_uploads_dir(app=app)
        create_database(app=app)

    @app.route("/api/healthcheck")
    def healthcheck():
        return jsonify({"status": "The api is up and running"}), 200

    app.register_blueprint(auth, url_prefix="/api/v1/auth", strict_slashes=False)
    app.register_blueprint(posts, url_prefix="/api/v1/user", strict_slashes=False)
    app.register_blueprint(admin, url_prefix="/api/v1/admin", strict_slashes=False)

    @app.get("/database/danger")
    def drop_database_tables():
        with app.app_context():
            db.drop_all()
            print("all database tables droped")
            create_database(app=app)
            print("database tables created again")
            return jsonify({"success": "All database tables dropped"})

    @app.errorhandler(404)
    def handle_not_found(e):
        return jsonify({"error": str(e)})

    @app.errorhandler(500)
    def handle_Internal_server_error(e):
        return jsonify({"error": str(e)})

    @app.after_request
    def add_security_header(response):
        response.headers["Content-Security-Policy"] = "default-src 'self'"
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = ", ".join(required_headers)
        return response

    @app.shell_context_processor
    def load_shell_context():
        return dict(db=db, User=User, Post=Post)

    return app


""" A function for creating a database """


def create_database(app):
    with app.app_context():
        db.create_all()
        print("database tables created")

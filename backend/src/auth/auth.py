from flask import Blueprint, request, jsonify, make_response
from flask_cors import cross_origin
from src.models.database import User
import re
from flask_jwt_extended import create_access_token, create_refresh_token

auth = Blueprint(
    "auth",
    __name__,
)


@auth.post("/register")
@cross_origin()
def register_user():
    try:
        register_data = request.get_json()
        if not verify_user_registration_details(register_data):
            return make_response("failed", error, 400)

        elif not verify_user_email(register_data["email"]):
            return make_response("failed", "Email is badly formated", 400)

        elif not verify_password(register_data["password"], register_data["confirm"]):
            return make_response("failed", "passwords do not match", 400)

        elif user_exists(register_data["email"]):
            return make_response("failed", "user with that email exists", 400)

        del register_data["confirm"]
        new_user = User(**register_data)
        return jsonify({"status": "success", "user_info": new_user.to_json()}), 201
    except Exception as error:
        return make_response("failed", str(error), 400)


@auth.post("/login")
@cross_origin()
def login_blogger():
    try:
        login_info = request.get_json()
        if verify_login_credentials(login_info):
            user = User.login_user(login_info)
            if user is not None:
                access_token = create_access_token(identity=user.id)
                refresh_token = create_refresh_token(identity=user.id)
                full_name = f"{user.first_name} {user.last_name}"
                return login_response(full_name, access_token, refresh_token)
            else:
                return make_response("failed", "Invalid email or password", 401)
        else:
            return make_response("failed", "all fields are required", 401)
    except Exception as error:
        make_response("failed", str(error), 401)


def make_response(status, message, status_code):
    return jsonify({"status": status, "message": message}), status_code


def verify_user_registration_details(new_user):
    required = {"first_name", "last_name", "email", "password", "confirm"}
    return required == set(new_user.keys())


def verify_user_email(email):
    if re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return True

    return False


def verify_password(password1, password2):
    return len(password1) > 6 and password1 == password2


def user_exists(email):
    return True if User.query.filter_by(email=email).first() else False


def verify_login_credentials(request_body):
    required = {"email", "password"}
    return required == set(request_body.keys())


def login_response(user, access_token, refresh_token):
    return jsonify(
        {
            "status": "success",
            "data": {
                "user": user,
                "access_token": access_token,
                "refresh_token": refresh_token,
            },
        }
    )


def handle_amount_of_people_to_register():
    users = User.query.all()
    if len(users) < 2:
        return True

    return False

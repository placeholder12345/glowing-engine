import json
import requests
from flask import Blueprint, request

from server import db
from server.models import User


login_bp = Blueprint("login_bp", __name__, url_prefix="/api/login")


@login_bp.route("/test", methods=["POST"])
def test():
    data = json.loads(request.data)
    name = data["name"]
    oauthid = data["oauth_id"]
    email = data["email"]
    user = User(name=name, oauth_id=oauthid, email=email)
    db.session.add(user)
    db.session.commit()
    return data
    # return data["name"]


@login_bp.route("/token", methods=["POST"])
def token():
    data = json.loads(request.data)
    token = data["token"]
    info = get_info(token)
    if "error" in info:
        return {"message": "Token is invalid"}, 400
    name = info["name"]
    email = info["email"]
    oauth_id = info["sub"]
    query_user = User.query.filter_by(email=email).first()
    if query_user is None:
        user = User(name=name, oauth_id=oauth_id, email=email)
        db.session.add(user)
        db.session.commit()
        return {
            "message": "Successfully created",
            "user_id": user.id,
            "name": user.name,
        }

    return {
        "message": "Account already exists",
        "user_id": query_user.id,
        "name": query_user.name,
    }


def get_info(token):
    response = requests.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={token}")
    data = response.json()
    return data
    # {
    # "iss": "https://accounts.google.com",
    # "sub": "110169484474386276334",
    # "azp": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
    # "aud": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
    # "iat": "1433978353",
    # "exp": "1433981953",
    # "email": "testuser@gmail.com",
    # "email_verified": "true",
    # "name": "Test User",
    # "picture": "https://lh4.googleusercontent.com/-kYgzyAWpZzJ/ABCDEFGHI/AAAJKLMNOP/tIXL9Ir44LE/s99-c/photo.jpg",
    # "given_name": "Test",
    # "family_name": "User",
    # "locale": "en",
    # }

    # return data


# response = {
#     "iss": "https://accounts.google.com",
#     "sub": "110169484474386276334",
#     "azp": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
#     "aud": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
#     "iat": "1433978353",
#     "exp": "1433981953",
#     "email": "testuser@gmail.com",
#     "email_verified": "true",
#     "name": "Test User",
#     "picture": "https://lh4.googleusercontent.com/-kYgzyAWpZzJ/ABCDEFGHI/AAAJKLMNOP/tIXL9Ir44LE/s99-c/photo.jpg",
#     "given_name": "Test",
#     "family_name": "User",
#     "locale": "en",
# }

# requests.get(endpoint)
# requests.post(endpoint)

# aaa = "world"
# f"hello {aaa[0]}"
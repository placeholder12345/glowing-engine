import json
import requests
from flask import Blueprint, request

from server import db
from server.models import User


login_bp = Blueprint("login_bp", __name__, url_prefix="/api/login")


@login_bp.route("/token", methods=["POST"])
def token():
    data = json.loads(request.data)
    token = data["user"]["tokenId"]
    info = requests.get(
        f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
    ).json()
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

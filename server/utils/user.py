from flask import session
from server.models import User


def get_current_user():
    user_id = session.get("user_id")

    user = User.query.filter_by(id=user_id).first()

    return user

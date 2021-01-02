from flask import Blueprint, request

from server import db
from server.utils import get_current_user
from server.models import GPA

gpa_bp = Blueprint("gpa_bp", __name__, url_prefix="/api/gpa")


@gpa_bp.route("/list")
def list_gpa():
    user = get_current_user()
    gpas = GPA.query.filter_by(user_id=user.id).all()

    gpa_list = []
    for gpa in gpas:
        gpa_obj = {
            "id": gpa.id,
            "class": gpa.class_name,
            "grade": float(gpa.grade)
        }
        gpa_list.append(gpa_obj)

    return {"results": gpa_list}


@gpa_bp.route("/update", methods=["POST"])
def update_gpa():
    user = get_current_user()

    new_gpas = request.get_json()["items"]

    gpas = GPA.query.filter_by(user_id=user.id).all()
    for i, gpa in enumerate(gpas):
        if len(new_gpas) <= i:
            db.session.delete(gpa)
        else:
            new_gpa = new_gpas[i]
            gpa.class_name = new_gpa["class"]
            gpa.grade = new_gpa["grade"]

    for i in range(len(gpas), len(new_gpas)):
        new_gpa = new_gpas[i]
        gpa = GPA(
            user_id=user.id,
            class_name=new_gpa["class"],
            grade=new_gpa["grade"]
        )
        db.session.add(gpa)

    db.session.commit()

    return str(new_gpas)

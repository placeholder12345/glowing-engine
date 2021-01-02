from flask import Blueprint, request

from server import db
from server.utils import get_current_user
from server.models import Grade


grades_bp = Blueprint("grades_bp", __name__, url_prefix="/api/grades")


@grades_bp.route("/list")
def list_grade():
    user = get_current_user()
    grades = Grade.query.filter_by(user_id=user.id).all()

    grades_list = []
    for grade in grades:
        grade_obj = {
            "id": grade.id,
            "course": grade.course,
            "name": grade.name,
            "type": grade.type,
            "score": float(grade.score),
        }
        grades_list.append(grade_obj)
    return {"results": grades_list}


@grades_bp.route("/add", methods=["POST"])
def add_grades():
    user_id = get_current_user().id
    new_grade = request.get_json()
    name = new_grade["name"]
    assignment = new_grade["type"]
    score = new_grade["score"]
    course = new_grade["course"]

    grade = Grade(
        user_id=user_id,
        course=course,
        name=name,
        type=assignment,
        score=score
    )
    db.session.add(grade)
    db.session.commit()

    return {"id": grade.id}


@grades_bp.route("/remove", methods=["POST"])
def remove_grade():
    grade_id = request.get_json()["id"]
    user_id = get_current_user().id

    grade = Grade.query.filter_by(user_id=user_id, id=grade_id).first()
    db.session.delete(grade)
    db.session.commit()

    return "Removed"

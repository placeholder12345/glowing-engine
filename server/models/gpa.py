from server import db


class GPA(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    class_name = db.Column(db.String(255))
    grade = db.Column(db.Numeric(10, 3))

    usere = db.relationship("User", backref="user_gpa")

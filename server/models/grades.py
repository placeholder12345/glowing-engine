from server import db


class Grade(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    course = db.Column(db.String(255))
    name = db.Column(db.String(255))
    type = db.Column(db.String(255))
    score = db.Column(db.Numeric(10, 2))

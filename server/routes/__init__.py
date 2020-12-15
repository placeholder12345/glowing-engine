from flask import Blueprint, current_app, send_from_directory


main_bp = Blueprint(
    "main_bp",
    __name__,
)


@main_bp.route("/", defaults={"filename": "index.html"})
@main_bp.route("/<path:filename>")
def get_client(filename):
    return send_from_directory(current_app.template_folder, filename)


@main_bp.errorhandler(404)
def page_not_found(_e):
    return send_from_directory(current_app.template_folder, "index.html")

from datetime import timedelta

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate(compare_type=True)


def create_app(config):
    app = Flask(
        __name__,
        instance_relative_config=False,
        static_folder=config.STATIC_FOLDER,
        template_folder=config.TEMPLATE_FOLDER,
    )
    app.config.from_object(config)
    app.permanent_session_lifetime = timedelta(days=365)

    db.init_app(app)
    migrate.init_app(app, db, render_as_batch=True)

    with app.app_context():
        import server.models
        import server.routes as routes

        app.register_blueprint(routes.main_bp)
        app.register_blueprint(routes.login_bp)

    return app

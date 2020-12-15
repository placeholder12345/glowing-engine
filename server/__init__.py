from datetime import timedelta

from flask import Flask


def create_app(config):
    app = Flask(
        __name__,
        instance_relative_config=False,
        static_folder=config.STATIC_FOLDER,
        template_folder=config.TEMPLATE_FOLDER,
    )
    app.config.from_object(config)
    app.permanent_session_lifetime = timedelta(days=365)

    with app.app_context():
        import server.routes as routes

        app.register_blueprint(routes.main_bp)

    return app

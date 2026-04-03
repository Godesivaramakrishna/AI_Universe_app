from flask import Flask
from flask_cors import CORS
from app.routes.tools_routes import tools_bp
from app.routes.recommend_routes import recommend_bp
from app.routes.chat_routes import chat_bp
from app.routes.api_key_routes import api_key_bp


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(tools_bp, url_prefix="/tools")
    app.register_blueprint(recommend_bp, url_prefix="/recommend")
    app.register_blueprint(chat_bp, url_prefix="/chat")
    app.register_blueprint(api_key_bp, url_prefix="/api-keys")

    @app.get("/health")
    def health() -> dict:
        return {"status": "ok", "service": "ai-service"}

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8002, debug=True)

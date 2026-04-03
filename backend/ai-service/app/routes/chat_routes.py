from flask import Blueprint, request, jsonify
from app.services.chatbot_service import chat_response

chat_bp = Blueprint("chat", __name__)


@chat_bp.post("/")
def chat_route():
    payload = request.get_json(silent=True) or {}
    message = payload.get("message", "")
    return jsonify(chat_response(message))

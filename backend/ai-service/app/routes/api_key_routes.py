from flask import Blueprint, jsonify
from app.services.api_key_service import get_guide

api_key_bp = Blueprint("api_keys", __name__)


@api_key_bp.get("/guide/<provider>")
def guide(provider: str):
    return jsonify(get_guide(provider))

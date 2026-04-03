from flask import Blueprint, request, jsonify
from app.services.recommendation_engine import recommend

recommend_bp = Blueprint("recommend", __name__)


@recommend_bp.get("/")
def recommend_route():
    category = request.args.get("category", "voice")
    budget = float(request.args.get("budget", "0"))
    multilingual = request.args.get("multilingual", "false").lower() == "true"
    return jsonify(recommend(category, budget, multilingual))

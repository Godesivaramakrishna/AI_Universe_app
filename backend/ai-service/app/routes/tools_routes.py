from flask import Blueprint, jsonify
from app.services.tool_service import list_tools, list_categories, list_pricing

tools_bp = Blueprint("tools", __name__)


@tools_bp.get("/")
def get_tools():
    return jsonify(list_tools())


@tools_bp.get("/categories")
def get_categories():
    return jsonify(list_categories())


@tools_bp.get("/pricing")
def get_pricing():
    return jsonify(list_pricing())

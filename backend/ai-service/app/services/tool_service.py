from app.config.settings import DATA_DIR
from app.utils.helpers import load_json


def list_tools() -> list[dict]:
    return load_json(DATA_DIR / "tools.json")


def list_categories() -> list[dict]:
    return load_json(DATA_DIR / "categories.json")


def list_pricing() -> list[dict]:
    return load_json(DATA_DIR / "pricing.json")

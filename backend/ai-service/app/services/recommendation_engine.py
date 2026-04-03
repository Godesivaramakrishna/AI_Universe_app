from app.services.tool_service import list_tools
from app.utils.ranking_algorithm import rank_tools


def recommend(category: str, budget: float, need_multilingual: bool) -> list[dict]:
    tools = [tool for tool in list_tools() if tool.get("category") == category]
    return rank_tools(tools, budget=budget, need_multilingual=need_multilingual)[:5]

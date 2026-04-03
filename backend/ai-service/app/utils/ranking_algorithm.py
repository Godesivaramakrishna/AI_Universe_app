def rank_tools(tools: list[dict], budget: float, need_multilingual: bool) -> list[dict]:
    scored: list[tuple[float, dict]] = []
    for tool in tools:
        score = float(tool.get("score", 0))
        price = float(tool.get("price_per_unit", 0))
        if budget and price > budget:
            score -= 0.2
        if need_multilingual and tool.get("multilingual"):
            score += 0.2
        scored.append((score, tool))

    scored.sort(key=lambda item: item[0], reverse=True)
    return [tool for _, tool in scored]

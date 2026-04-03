GUIDES = {
    "openai": [
        "Create account at platform.openai.com",
        "Open API Keys page",
        "Create secret key",
        "Store securely and add billing",
    ],
    "google": [
        "Open Google Cloud Console",
        "Create project",
        "Enable target API",
        "Create restricted API key",
    ],
    "anthropic": [
        "Create account at console.anthropic.com",
        "Go to API Keys",
        "Create key and copy once",
        "Add credits in billing",
    ],
}


def get_guide(provider: str) -> dict:
    key = provider.lower()
    steps = GUIDES.get(key)
    if not steps:
        return {"provider": provider, "steps": [], "message": "Guide not found"}
    return {"provider": key, "steps": steps}

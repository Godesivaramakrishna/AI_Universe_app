def chat_response(message: str) -> dict:
    text = message.lower()
    if "api key" in text:
        return {
            "answer": "Use /api-keys/guide/<provider> to get setup steps. Example providers: openai, google, anthropic.",
            "intent": "api_key_help",
        }
    if "text to speech" in text or "tts" in text:
        return {
            "answer": "Top picks: Google Text-to-Speech and ElevenLabs. Use /recommend with category=voice for budget-based ranking.",
            "intent": "tool_recommendation",
        }
    return {
        "answer": "I can help with tool discovery, pricing comparison, and API key setup guidance.",
        "intent": "general",
    }

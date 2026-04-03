from fastapi import FastAPI, HTTPException
import httpx

AUTH_SERVICE = "http://localhost:8001"
AI_SERVICE = "http://localhost:8002"

app = FastAPI(title="AI Universe API Gateway", version="1.0.0")


@app.get("/health")
async def health() -> dict:
    return {"status": "ok", "service": "api-gateway"}


@app.post("/auth/signup")
async def signup(payload: dict):
    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.post(f"{AUTH_SERVICE}/auth/signup", json=payload)
    if response.status_code >= 400:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()


@app.post("/auth/login")
async def login(payload: dict):
    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.post(f"{AUTH_SERVICE}/auth/login", json=payload)
    if response.status_code >= 400:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()


@app.get("/tools")
async def tools():
    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.get(f"{AI_SERVICE}/tools/")
    if response.status_code >= 400:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()


@app.get("/recommend")
async def recommend(category: str = "voice", budget: float = 0, multilingual: bool = False):
    params = {"category": category, "budget": budget, "multilingual": str(multilingual).lower()}
    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.get(f"{AI_SERVICE}/recommend/", params=params)
    if response.status_code >= 400:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

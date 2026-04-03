from fastapi import FastAPI
from app.routes.auth_routes import router as auth_router

app = FastAPI(title="AI Universe Auth Service", version="1.0.0")
app.include_router(auth_router, prefix="/auth", tags=["auth"])


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "service": "auth-service"}

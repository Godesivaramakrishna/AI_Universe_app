from fastapi import APIRouter
from app.schemas.user_schema import SignupRequest, LoginRequest, AuthResponse
from app.services.auth_service import signup, login

router = APIRouter()


@router.post("/signup", response_model=AuthResponse)
def signup_route(payload: SignupRequest) -> AuthResponse:
    return signup(payload)


@router.post("/login", response_model=AuthResponse)
def login_route(payload: LoginRequest) -> AuthResponse:
    return login(payload)

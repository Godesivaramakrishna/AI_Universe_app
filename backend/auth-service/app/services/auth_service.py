from uuid import uuid4
from fastapi import HTTPException
from app.db.database import USERS_BY_EMAIL
from app.models.user_model import User
from app.core.security import hash_password, verify_password, create_access_token
from app.schemas.user_schema import SignupRequest, LoginRequest, AuthResponse


def signup(payload: SignupRequest) -> AuthResponse:
    email = payload.email.lower()
    if email in USERS_BY_EMAIL:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        id=str(uuid4()),
        name=payload.name,
        email=email,
        hashed_password=hash_password(payload.password),
    )
    USERS_BY_EMAIL[email] = user
    token = create_access_token(subject=user.id)
    return AuthResponse(id=user.id, name=user.name, email=user.email, access_token=token)


def login(payload: LoginRequest) -> AuthResponse:
    email = payload.email.lower()
    user = USERS_BY_EMAIL.get(email)
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(subject=user.id)
    return AuthResponse(id=user.id, name=user.name, email=user.email, access_token=token)

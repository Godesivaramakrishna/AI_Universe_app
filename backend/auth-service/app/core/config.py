import os


class Settings:
    jwt_secret: str = os.getenv("JWT_SECRET", "change-this-secret")
    jwt_algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")


settings = Settings()

from app.models.user_model import User

# Demo in-memory user store.
USERS_BY_EMAIL: dict[str, User] = {}

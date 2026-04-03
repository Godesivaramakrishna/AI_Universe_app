from pydantic import BaseModel


class UserQuery(BaseModel):
    category: str
    budget: float
    need_multilingual: bool = False

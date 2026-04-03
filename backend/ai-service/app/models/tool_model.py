from pydantic import BaseModel


class Tool(BaseModel):
    id: str
    name: str
    category: str
    pricing: str
    score: float
    languages: list[str] = []

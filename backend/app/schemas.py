from pydantic import BaseModel


class AuthRequest(BaseModel):
    username: str
    password: str


class TokenData(BaseModel):
    user_id: str


class User(BaseModel):
    user_id: str

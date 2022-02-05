import datetime
from typing import Optional

from pydantic import BaseModel


class AuthRequest(BaseModel):
    username: str
    password: str


class TokenData(BaseModel):
    user_id: str


class User(BaseModel):
    user_id: str


class ProcessingNewResponse(BaseModel):
    id: int
    filename: str
    status: int


class ProcessingItemResponse(BaseModel):
    id: int
    name: str
    uploaded_at: datetime.datetime
    finished_at: Optional[datetime.datetime]
    status: int
    result: Optional[str]
    error: Optional[str]

    class Config:
        orm_mode = True

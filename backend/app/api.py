import datetime

from fastapi import APIRouter, Response, status, File, UploadFile, Depends, HTTPException

from app.core.config import get_app_settings
from app.schemas import AuthRequest, User
from app.security import create_access_token, get_current_user


settings = get_app_settings()
api_router = APIRouter(prefix="/api")


@api_router.post("/auth", tags=["Authentication"], status_code=200)
async def auth(user: AuthRequest, response: Response):
    valid_username = settings.user_username
    valid_password = settings.user_password

    if user.username != valid_username or user.password != valid_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid username or password",
        )

    access_token_expires = datetime.timedelta(minutes=settings.jwt_token_expire)
    access_token = create_access_token(
        data={"sub": str(settings.user_id), "name": valid_username}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "Bearer"}


@api_router.get("/processing", tags=["Processing"])
async def processing_items(user: User = Depends(get_current_user)):
    return {'user_id': user.user_id}


@api_router.post("/processing", tags=["Processing"])
async def processing_new(file: UploadFile, user: User = Depends(get_current_user)):
    return {}

import datetime
import os.path
import hashlib
from typing import List
import aiofiles

from fastapi import APIRouter, Response, status, File, UploadFile, Depends, HTTPException
import sqlalchemy
from sqlalchemy.orm import Session

from app.core.config import get_app_settings
from app.schemas import AuthRequest, User, ProcessingNewResponse, ProcessingItemResponse
from app.security import create_access_token, get_current_user
from app.db.session import get_db
from app.models import ProcessingFile, ProcessingStatus


settings = get_app_settings()
api_router = APIRouter(prefix="/api")


@api_router.post("/auth", tags=["Authentication"], status_code=200)
async def auth(user: AuthRequest):
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


@api_router.get("/processing", tags=["Processing"], response_model=List[ProcessingItemResponse])
async def processing_items(
        user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    return db\
        .query(ProcessingFile)\
        .filter(ProcessingFile.user_id == user.user_id)\
        .order_by(sqlalchemy.desc(ProcessingFile.id))\
        .all()


@api_router.post("/processing", tags=["Processing"], response_model=ProcessingNewResponse)
async def processing_new(
        file: UploadFile = File(...),
        user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    filename = "tep_{}.tmp".format(hashlib.md5(file.filename.encode('utf-8')).hexdigest())
    file_path = os.path.join(settings.upload_directory, filename)
    async with aiofiles.open(file_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)

    proc_file = ProcessingFile()
    proc_file.user_id = user.user_id
    proc_file.name = file.filename
    proc_file.path = file_path
    proc_file.status = ProcessingStatus.uploaded
    proc_file.uploaded_at = datetime.datetime.now()

    db.add(proc_file)
    db.commit()

    return ProcessingNewResponse(
        id=proc_file.id,
        filename=file.filename,
        status=proc_file.status
    )

import enum

from sqlalchemy import Column, Integer, Enum, String, DateTime

from app.db.base_class import Base


class ProcessingStatus(enum.IntEnum):
    uploaded = 1
    in_progress = 2
    finished = 3
    error = 4


class ProcessingFile(Base):
    id: int = Column(Integer, primary_key=True, index=True)
    user_id: int = Column(Integer, nullable=False)
    name: str = Column(String(255))
    path: str = Column(String(255))
    uploaded_at = Column(DateTime, nullable=False)
    finished_at = Column(DateTime, nullable=True, default=None)
    status: ProcessingStatus = Column(Enum(ProcessingStatus))
    result: str = Column(String(255))
    error: str = Column(String(255))

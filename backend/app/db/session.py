from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import get_app_settings


settings = get_app_settings()

engine = create_engine(settings.database_url, pool_pre_ping=True, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

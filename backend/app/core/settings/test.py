import logging

from pydantic import PostgresDsn, SecretStr

from app.core.settings.app import AppSettings


class TestAppSettings(AppSettings):
    debug: bool = True

    title: str = "[Test] Test Excel Parsing"

    secret_key: SecretStr = SecretStr("test_secret")

    logging_level: int = logging.DEBUG

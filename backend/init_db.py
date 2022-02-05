import alembic.config


def init_rdbms():
    """Align database schema to latest version."""
    alembic.config.main(argv=["upgrade", "head"])


if __name__ == "__main__":
    init_rdbms()

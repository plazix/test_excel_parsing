"""init db

Revision ID: af015e38afb4
Revises: 
Create Date: 2022-02-05 16:06:44.152411

"""
from alembic import op
import sqlalchemy as sa


revision = 'af015e38afb4'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('processingfile',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('path', sa.String(length=255), nullable=True),
    sa.Column('uploaded_at', sa.DateTime(), nullable=False),
    sa.Column('finished_at', sa.DateTime(), nullable=True),
    sa.Column('status', sa.Enum('uploaded', 'in_progress', 'finished', 'error', name='processingstatus'), nullable=True),
    sa.Column('result', sa.String(length=255), nullable=True),
    sa.Column('error', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_processingfile_id'), 'processingfile', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_processingfile_id'), table_name='processingfile')
    op.drop_table('processingfile')
    # ### end Alembic commands ###
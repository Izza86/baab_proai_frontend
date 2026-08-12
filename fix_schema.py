import os

# Read current schema
schema_path = r"E:\baab_proai_backend\app\schemas\item.py"
with open(schema_path) as f:
    current = f.read()

print("CURRENT SCHEMA:")
print(current)
print("---")

# Write correct schema with all needed fields
correct_schema = '''from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime


VALID_STATUSES = {"pending", "in_progress", "completed"}


class ItemBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[str] = "pending"
    priority: Optional[int] = 1


class ItemCreate(ItemBase):
    title: str

    @field_validator("status")
    @classmethod
    def validate_status(cls, v):
        if v and v not in VALID_STATUSES:
            raise ValueError(f"status must be one of {VALID_STATUSES}")
        return v


class ItemUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[int] = None

    @field_validator("status")
    @classmethod
    def validate_status(cls, v):
        if v and v not in VALID_STATUSES:
            raise ValueError(f"status must be one of {VALID_STATUSES}")
        return v


class ItemResponse(ItemBase):
    id: str
    user_id: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}
'''

with open(schema_path, "w", encoding="utf-8") as f:
    f.write(correct_schema)

print("SCHEMA UPDATED SUCCESSFULLY!")

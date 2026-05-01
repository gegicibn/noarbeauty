from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class ReportStatusUpdate(BaseModel):
    report_id: str
    status: str
    results: dict | None = None
    pdf_url: str | None = None

@router.get("/health")
def reports_health():
    return {"status": "ok"}

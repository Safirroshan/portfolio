from fastapi import APIRouter
from app.services.ollama_service import generate_streaming_response
from pydantic import BaseModel
from fastapi.responses import StreamingResponse

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/")
async def chat(request: ChatRequest):
    system_prompt = """You are an AI Assistant for Safir's Portfolio.
    Safir is an AI Automation Engineer and Computer Vision Developer.
    He is skilled in Python, YOLO, FastAPI, and LLMs.
    Answer questions about his skills and projects professionally.
    Keep answers concise and relevant to his portfolio."""

    return StreamingResponse(
        generate_streaming_response(system_prompt, request.message, model="llama3-8b-8192"),
        media_type="text/plain"
    )

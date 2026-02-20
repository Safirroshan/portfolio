from app.services.ollama_service import analyze_image_with_ollama
from fastapi import APIRouter, UploadFile, File

router = APIRouter()

@router.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    contents = await file.read()
    
    # Prompt for the vision model
    prompt = """Analyze this image in detail. 
    1. List detected objects with confidence estimates if possible.
    2. Describe the scene context.
    3. Provide an AI technical insight about what is shown.
    Format the response with Markdown headers."""
    
    analysis = await analyze_image_with_ollama(contents, prompt=prompt, model="llava")
    
    return {"analysis": analysis}

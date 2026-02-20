from app.services.yolo_service import process_image
from fastapi import APIRouter, UploadFile, File

router = APIRouter()

@router.post("/detect")
async def detect_objects(file: UploadFile = File(...)):
    contents = await file.read()
    detections = process_image(contents)
    
    return {
        "detections": detections,
        "fps": 0 # Real FPS would be calculated client-side or via stream
    }

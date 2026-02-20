from ultralytics import YOLO
import cv2
import numpy as np
from app.config import settings
import base64

# Load model once at startup
try:
    model = YOLO(settings.YOLO_MODEL_PATH)
except:
    # Fallback to downloading yolov8n if path not found
    model = YOLO("yolov8n.pt") 

def process_image(image_bytes: bytes):
    # Convert bytes to numpy array
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Run inference
    results = model(img)
    
    detections = []
    
    # Process results
    for result in results:
        for box in result.boxes:
            cls = int(box.cls[0])
            conf = float(box.conf[0])
            xyxy = box.xyxy[0].tolist()
            class_name = model.names[cls]
            
            detections.append({
                "class": class_name,
                "confidence": round(conf, 2),
                "bbox": [int(x) for x in xyxy]
            })
            
    return detections

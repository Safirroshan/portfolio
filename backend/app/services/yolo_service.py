from ultralytics import YOLO
import cv2
import numpy as np
from app.config import settings
import base64

# Lazy-loaded model — only downloaded/initialized on first request
# This prevents Render's 90-second health check timeout
_model = None

def get_model():
    global _model
    if _model is None:
        try:
            _model = YOLO(settings.YOLO_MODEL_PATH)
        except Exception:
            # Auto-download yolov8n from Ultralytics if local path not found
            _model = YOLO("yolov8n.pt")
    return _model


def process_image(image_bytes: bytes):
    model = get_model()

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

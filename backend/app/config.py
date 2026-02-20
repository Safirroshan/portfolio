import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Safir's AI Portfolio"
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    YOLO_MODEL_PATH: str = os.getenv("YOLO_MODEL_PATH", "models/yolov8n.pt")

settings = Settings()

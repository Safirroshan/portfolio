from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chatbot, yolo, vision
import os
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

# Rate limiter to prevent abuse
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Safir's AI Portfolio Backend",
    docs_url=None,  # Disable docs in production for security
    redoc_url=None,  # Disable redoc in production
)

# Add rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS Configuration - SECURE
# Only allow requests from your Vercel domain
allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Add your Vercel domain after deployment
# Get from environment variable for security
vercel_url = os.getenv("VERCEL_URL", "")
if vercel_url:
    # Strip https:// prefix if already included, then add it once
    clean_url = vercel_url.replace("https://", "").replace("http://", "").rstrip("/")
    allowed_origins.append(f"https://{clean_url}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,  # Only allow specific origins
    allow_credentials=True,
    allow_methods=["POST", "GET"],  # Only allow needed methods
    allow_headers=["Content-Type", "Authorization"],  # Only allow needed headers
)

# Security headers middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response

@app.get("/")
@limiter.limit("10/minute")  # Rate limit: 10 requests per minute
def read_root(request: Request):
    return {"status": "ok", "message": "AI Portfolio Backend is running"}

# Include Routers
app.include_router(chatbot.router, prefix="/api/chat", tags=["Chatbot"])
app.include_router(yolo.router, prefix="/api/yolo", tags=["YOLO"])
app.include_router(vision.router, prefix="/api/vision", tags=["Vision"])

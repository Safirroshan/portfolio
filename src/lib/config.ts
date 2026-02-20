// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// API Endpoints
export const API_ENDPOINTS = {
  chat: `${API_URL}/api/chat/`,
  yoloDetect: `${API_URL}/api/yolo/detect`,
  visionAnalyze: `${API_URL}/api/vision/analyze`,
};

// Check if backend is available (for production)
export const isBackendAvailable = () => {
  // In production, you might want to add logic to check if backend is reachable
  return !!API_URL;
};

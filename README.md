# Safir's AI Portfolio

A modern, high-performance portfolio website showcasing AI engineering skills, featuring real-time object detection, local LLM integration, and interactive 3D elements.

## 🚀 Features

*   **AI Chatbot**: Powered by local LLMs (Ollama + Mistral/Llama 3).
*   **Live YOLO Detection**: Real-time object detection via webcam using Ultralytics YOLOv8.
*   **AI Vision Explainer**: Upload images for instant analysis using multimodal LLMs (LLaVA).
*   **Immersive UI**: Glassmorphism, neon aesthetics, and smooth animations (Framer Motion, GSAP, Three.js).
*   **Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, FastAPI, Python.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

1.  **Node.js** (v18+)
2.  **Python** (v3.10+)
3.  **Ollama** (for local AI models) -> [Download Ollama](https://ollama.com/)

### Pull Required AI Models
Open your terminal and run:
```bash
ollama pull mistral  # For Chatbot
ollama pull llava    # For Vision Explainer
```

## 📦 Installation

### 1. Frontend Setup
Navigate to the project root:
```bash
cd portfolio
npm install
```

### 2. Backend Setup
Navigate to the backend directory:
```bash
cd backend
# Optional: Create a virtual environment
# python -m venv venv
# .\venv\Scripts\activate

pip install -r requirements.txt
```

## 🏃‍♂️ Running the Application

You need to run both the **Frontend** and **Backend** servers simultaneously in separate terminals.

### Terminal 1: Backend (FastAPI)
```bash
cd portfolio/backend
uvicorn app.main:app --reload
```
*The backend runs on `http://localhost:8000`*

### Terminal 2: Frontend (Next.js)
```bash
cd portfolio
npm run dev
```
*The frontend runs on `http://localhost:3000`*

## 🌟 Usage

1.  Open `http://localhost:3000` in your browser.
2.  **Chatbot**: Click the chat icon in the bottom right to talk to the AI assistant.
3.  **AI Lab**: Scroll to the AI Lab section to try the **Vision Explainer** and **YOLO Demo**.
    *   **YOLO**: Grant camera permissions to see real-time object detection.
    *   **Vision**: Upload an image to get a description.

## 🤝 Contributing

Feel free to fork this repository and submit pull requests.

## 📄 License

MIT License

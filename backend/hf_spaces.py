"""
Hugging Face Spaces compatible version
This can be deployed to Hugging Face Spaces for FREE
"""
import gradio as gr
from app.main import app as fastapi_app

# Mount FastAPI app with Gradio for Hugging Face Spaces
demo = gr.mount_gradio_app(fastapi_app, path="/")

if __name__ == "__main__":
    demo.launch()

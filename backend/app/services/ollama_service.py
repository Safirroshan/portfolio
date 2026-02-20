import httpx
import json
import os

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"


async def generate_response(system_prompt: str, user_message: str, model: str = "llama3-8b-8192"):
    if not GROQ_API_KEY:
        return "Chatbot is not configured. Please set GROQ_API_KEY environment variable."
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }
    data = {
        "model": model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message},
        ],
        "max_tokens": 512,
    }
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(GROQ_API_URL, headers=headers, json=data, timeout=30.0)
            if response.status_code == 200:
                return response.json()["choices"][0]["message"]["content"]
            return f"Error: Groq returned status {response.status_code}: {response.text}"
    except httpx.ConnectError:
        return "Error: Could not connect to Groq API."
    except Exception as e:
        return f"Error: {type(e).__name__}: {e}"


async def generate_streaming_response(system_prompt: str, user_message: str, model: str = "llama3-8b-8192"):
    """Yields the full Groq response as a single chunk."""
    response = await generate_response(system_prompt, user_message, model)
    yield response


async def analyze_image_with_ollama(
    image_bytes: bytes,
    prompt: str = "Describe this image",
    model: str = "llava-v1.5-7b-4096-preview",
):
    import base64

    base64_image = base64.b64encode(image_bytes).decode("utf-8")

    if not GROQ_API_KEY:
        return "Vision analysis not configured. Please set GROQ_API_KEY."

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }
    data = {
        "model": "llava-v1.5-7b-4096-preview",
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
                    },
                ],
            }
        ],
        "max_tokens": 512,
    }
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(GROQ_API_URL, headers=headers, json=data, timeout=30.0)
            if response.status_code == 200:
                return response.json()["choices"][0]["message"]["content"]
            return f"Error: Groq returned status {response.status_code}"
    except Exception as e:
        return f"Error: {str(e)}"

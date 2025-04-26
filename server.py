from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from transformers import MarianMTModel, MarianTokenizer

app = Flask(__name__)
CORS(app)

OLLAMA_API_URL = "http://localhost:11434/api/generate"

# Load translation models
models = {
    "hi": {
        "tokenizer": MarianTokenizer.from_pretrained("Helsinki-NLP/opus-mt-en-hi"),
        "model": MarianMTModel.from_pretrained("Helsinki-NLP/opus-mt-en-hi")
    },
    "mr": {
        "tokenizer": MarianTokenizer.from_pretrained("Helsinki-NLP/opus-mt-en-mr"),
        "model": MarianMTModel.from_pretrained("Helsinki-NLP/opus-mt-en-mr")
    }
}

def translate_text(text, target_lang):
    if target_lang not in models:
        return text  # No translation model for this language

    tokenizer = models[target_lang]["tokenizer"]
    model = models[target_lang]["model"]

    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    translated = model.generate(**inputs)
    translated_text = tokenizer.decode(translated[0], skip_special_tokens=True)

    return translated_text

@app.route('/explain', methods=['POST'])
def explain():
    data = request.json
    text = data.get('text', '')
    lang = data.get('lang', 'en')

    prompt = f"Explain this in simple terms: {text}"

    try:
        response = requests.post(OLLAMA_API_URL, json={
            "model": "minicpm-v",
            "prompt": prompt,
            "stream": False
        })

        response.raise_for_status()
        ai_text = response.json().get("response", "")

        # Translate if needed
        if lang != 'en':
            ai_text = translate_text(ai_text, lang)

        return jsonify({"explanation": ai_text})

    except Exception as e:
        return jsonify({"explanation": f"Error: {str(e)}"})

if __name__ == '__main__':
    app.run(port=5050)

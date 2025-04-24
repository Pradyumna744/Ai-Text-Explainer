# AI Text Explainer Chrome Extension

![AI Text Explainer](https://via.placeholder.com/800x400?text=AI+Text+Explainer)

## 🧠 Overview

AI Text Explainer is a powerful Chrome extension that allows users to select any text on a webpage and instantly get simplified AI-powered explanations. The extension uses local AI models through Ollama and supports multilingual explanations.

## ✨ Features

- **Instant Explanations**: Select any text and get an AI-powered explanation immediately
- **Multilingual Support**: Get explanations in English, Hindi, and Marathi
- **Simplify Further**: One-click option to simplify explanations even more
- **Customizable UI**: 
  - Light/Dark mode toggle with persistent settings
  - Resizable explanation window
  - Positioned conveniently near your text selection
- **Local Privacy**: Uses your local Ollama instance for AI processing

## 🖼️ Screenshots

![Dark Mode](https://via.placeholder.com/400x300?text=Dark+Mode+Screenshot)
![Light Mode](https://via.placeholder.com/400x300?text=Light+Mode+Screenshot)

## 🛠️ Technology Stack

- **Frontend**: JavaScript Chrome Extension with custom CSS
- **Backend**: Python Flask server
- **AI Processing**: 
  - [Ollama](https://ollama.ai/) with minicpm-v model for explanations
  - MarianMT models for translations via Hugging Face Transformers

## 📋 Prerequisites

- [Python 3.7+](https://www.python.org/downloads/)
- [Ollama](https://ollama.ai/download) installed and running locally
- Chrome browser

## 🚀 Installation

### Backend Server Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-text-explainer.git
   cd ai-text-explainer
   ```

2. Install server dependencies:
   ```bash
   cd Server
   pip install -r requirements.txt
   ```

3. Download the minicpm-v model for Ollama:
   ```bash
   ollama pull minicpm-v
   ```

4. Start the Flask server:
   ```bash
   python server.py
   ```
   The server runs on `http://127.0.0.1:5050` by default.

### Chrome Extension Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top right)
3. Click "Load unpacked" and select the `Extension` directory from the cloned repository
4. The extension is now installed and ready to use!

## 🔍 How to Use

1. Select any text on a webpage (at least 10 characters)
2. A popup will appear near your selection with the AI explanation
3. Use the "Simplify" button to make the explanation even simpler
4. Change the language using the dropdown menu
5. Resize the explanation window by dragging the bottom-right corner
6. Close the window by clicking the X or pressing Escape

## 🧩 Project Structure

```
ai-text-explainer/
├── Extension/              # Chrome extension files
│   ├── manifest.json       # Extension manifest
│   ├── content.js          # Extension's content script
│   └── tooltip.css         # Styling for the explanation popup
└── Server/                 # Backend server files
    ├── server.py           # Flask backend server
    └── requirements.txt    # Python dependencies
```

## 🔄 How It Works

1. When text is selected, the extension captures it and sends it to the local Flask server
2. The server uses Ollama's minicpm-v model to generate a simplified explanation
3. If a non-English language is selected, the server translates the explanation using MarianMT models
4. The explanation is displayed in a customizable popup near the selected text
5. Users can further simplify or ask follow-up questions about the explanation

## 🔮 Future Plans

- Support for more languages
- Advanced follow-up question capability
- Save explanations for later reference
- Custom model selection
- API key integration for cloud-based models

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.


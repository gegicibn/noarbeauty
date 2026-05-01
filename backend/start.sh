#!/bin/bash
echo "🚀 Pokretanje NoarBeauty AI backend-a..."

if [ ! -d "venv" ]; then
  echo "📦 Kreiranje virtualnog okruženja..."
  python3 -m venv venv
fi

source venv/bin/activate

echo "📥 Instalacija zavisnosti..."
pip install -r requirements.txt -q

if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "⚠️  Kreiran .env fajl — dodaj GEMINI_API_KEY pre pokretanja"
fi

export $(grep -v '^#' .env | xargs) 2>/dev/null

echo "✅ Backend se pokreće na http://localhost:8000"
python main.py

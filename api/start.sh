#!/bin/bash
set -e
echo "🚀 NoarBeauty AI — Python API v2"

[ ! -d "venv" ] && python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt -q

[ ! -f ".env" ] && cp .env.example .env && echo "⚠️  Popuni .env sa API ključevima"
export $(grep -v '^#' .env | grep -v '^$' | xargs)

echo "✅ API dostupan na http://localhost:8000/docs"
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

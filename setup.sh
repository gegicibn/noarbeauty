#!/bin/bash
# NoarBeauty AI — Setup skript
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  NoarBeauty AI — Setup${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 1. Node.js provjera
echo -e "${YELLOW}[1/5] Provera Node.js...${NC}"
if ! command -v node &> /dev/null; then
  echo "   ❌ Node.js nije instaliran."
  echo "   Instaliraj sa: https://nodejs.org (LTS verzija)"
  echo "   ili: brew install node"
  exit 1
fi
echo -e "   ✅ Node.js $(node -v)"

# 2. Python provjera
echo -e "${YELLOW}[2/5] Provera Python-a...${NC}"
if ! command -v python3 &> /dev/null; then
  echo "   ❌ Python 3 nije instaliran."
  echo "   Instaliraj sa: https://python.org ili: brew install python3"
  exit 1
fi
echo -e "   ✅ Python $(python3 --version)"

# 3. Next.js setup
echo -e "${YELLOW}[3/5] Instalacija Next.js zavisnosti...${NC}"
cd noarbeauty
if [ ! -f ".env.local" ]; then
  cp .env.local.example .env.local
  echo -e "   ⚠️  Kreiran .env.local — POPUNI SA SVOJIM VREDNOSTIMA pre pokretanja!"
fi
npm install
cd ..
echo -e "   ✅ Next.js zavisnosti instalirane"

# 4. Python API setup
echo -e "${YELLOW}[4/5] Instalacija Python zavisnosti...${NC}"
cd api
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt -q
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo -e "   ⚠️  Kreiran api/.env — POPUNI SA TVOJIM API KLJUČEVIMA!"
fi
cd ..
echo -e "   ✅ Python zavisnosti instalirane"

# 5. Supabase migracije
echo -e "${YELLOW}[5/5] Baza podataka...${NC}"
echo -e "   📋 Pokreni ove SQL migracije u Supabase SQL Editor-u:"
echo -e "   ${BLUE}noarbeauty/supabase/migrations/001_initial.sql${NC}"
echo -e "   ${BLUE}noarbeauty/supabase/migrations/002_functions.sql${NC}"
echo -e "   ${BLUE}noarbeauty/supabase/migrations/003_storage.sql${NC}"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  Setup završen!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📝 Sledeći koraci:"
echo "   1. Popuni noarbeauty/.env.local sa Supabase, Stripe, Resend ključevima"
echo "   2. Popuni api/.env sa Anthropic, Haut.AI, Replicate ključevima"
echo "   3. Pokreni Supabase SQL migracije"
echo "   4. Pokretanje:"
echo ""
echo -e "   ${BLUE}Terminal 1 (Python API):${NC}"
echo "   cd api && bash start.sh"
echo ""
echo -e "   ${BLUE}Terminal 2 (Next.js):${NC}"
echo "   cd noarbeauty && npm run dev"
echo ""
echo -e "   ${BLUE}Terminal 3 (Stripe webhook lokalno):${NC}"
echo "   stripe listen --forward-to localhost:3000/api/stripe/webhook"
echo ""
echo "   App: http://localhost:3000"
echo "   API docs: http://localhost:8000/docs"
echo ""

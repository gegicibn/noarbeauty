# noarbeauty.ai — Arhitektura projekta

## Stack

| Sloj | Tehnologije |
|------|------------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS |
| Auth + DB | Supabase (PostgreSQL, RLS, Storage) |
| AI analiza | Python FastAPI + MediaPipe Face Mesh |
| AI izveštaj | Anthropic Claude (`claude-opus-4-5`) |
| Skin | Haut.AI REST API |
| Morph viz. | Replicate (FLUX + InstantID) |
| Plaćanje | Stripe (subscription) |
| Email | Resend |
| PDF | @react-pdf/renderer (server-side) |
| Analytics | PostHog |
| Monitoring | Sentry (`@sentry/nextjs`) |

## Direktorijumi

```
test-claude/
├── noarbeauty/        # Next.js app (Vercel)
│   ├── app/
│   │   ├── (auth)/           # sign-in, sign-up, forgot-password
│   │   ├── (dashboard)/      # dashboard, upload, reports, settings, onboarding
│   │   ├── (legal)/          # uslovi, privatnost, disclaimer
│   │   ├── auth/callback/    # Supabase OAuth callback
│   │   └── api/              # stripe/*, reports/*/pdf, auth/signout
│   ├── components/
│   │   ├── landing/          # Hero, HowItWorks, Features, SampleReport, Pricing, FAQ, FinalCTA
│   │   ├── layout/           # Navbar, Footer
│   │   ├── report/           # ReportActions, ComparisonSlider, LandmarkOverlay
│   │   └── upload/           # EthnicitySelector
│   ├── lib/
│   │   ├── supabase/         # client.ts, server.ts
│   │   ├── types/            # database.types.ts (ReportResults type)
│   │   ├── email/            # resend.ts (sendReportReady, sendWelcome)
│   │   └── pdf/              # generator.tsx (2-page React-PDF)
│   ├── hooks/                # useTracking.ts, useReportPolling.ts
│   └── supabase/migrations/  # 001-005 SQL migration files
└── api/               # Python FastAPI (Railway/Fly.io)
    ├── main.py
    ├── routers/analyze.py
    └── services/
        ├── mediapipe_analyzer.py   # Farkas + Powell analysis
        ├── ethnic_norms.py         # 7 etničkih normi, percentili
        ├── claude_report.py        # AI izveštaj + fallback
        ├── haut_ai.py              # Skin analiza
        └── replicate_morph.py      # Before/after vizualizacija
```

## User flow

1. Landing (`/`) → Sign up (`/sign-up`) → **Onboarding** (`/onboarding`, 3 koraka)
2. Upload 3 fotografije (`/upload`) → Python API → rezultati u Supabase
3. Report (`/reports/[id]`) → PDF generisanje (opciono) → email

## Supabase tabele

- **profiles** — id, email, full_name, plan (free/pro/elite), analyses_used, stripe_*
- **reports** — id, user_id, status, language, front_photo_url, results (JSONB), pdf_url
- **payments** — id, user_id, stripe_payment_intent_id, amount

## Ključne varijable okruženja

### noarbeauty/.env.local
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_PRICE_ID=
STRIPE_ELITE_PRICE_ID=
RESEND_API_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com
SENTRY_DSN=
PYTHON_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### api/.env
```
ANTHROPIC_API_KEY=
HAUT_AI_API_KEY=
REPLICATE_API_TOKEN=
```

## Cene (Stripe)
- **Pro**: 990 RSD/mesečno — neograničene analize, PDF izveštaji
- **Elite**: 2490 RSD/mesečno — Pro + morph vizualizacija + landmark overlay

## Pokretanje lokalno

```bash
# Next.js
cd noarbeauty && npm install && npm run dev

# Python API
cd api && pip install -r requirements.txt && bash start.sh

# Supabase (lokalni)
supabase start
# Pokrenuti migracije u Supabase Dashboard > SQL Editor (001-005)
```

## Stripe webhook (lokalno)
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Deployment
- **Next.js** → Vercel (automatski deploy iz git)
- **Python API** → Railway (`railway up`) ili Fly.io (`fly deploy`)
- **Python URL** → dodati u Vercel env: `PYTHON_API_URL=https://api.noarbeauty.ai`

## Cefalometrijski standardi

- **Farkas (1994)**: morfometrički indeks, trećine lica, nos/širina lica 0.25
- **Powell (1984)**: nazofrontalni 115-130°, nasolabijalni 90-120°
- **Zlatni rez φ=1.618**: h/w, zygom/jaw, nos/usta proporcije
- **7 etničkih normi**: slavic, european, east_asian, south_asian, african, latin, middle_eastern

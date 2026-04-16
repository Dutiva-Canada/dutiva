# Dutiva

HR compliance platform for Canadian small businesses.

## Stack
- React 19 + Vite
- TailwindCSS
- Supabase
- Vercel deployment

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Required Environment Variables

- VITE_SUPABASE_URL
- VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
- VITE_SITE_URL

## Deployment

1. Push repo to GitLab or GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

## Notes

- Authentication must be configured for production
- Bilingual mode supported (EN/FR)
- Theme supports Dark / Light / System

## Status

Pre-launch (beta)

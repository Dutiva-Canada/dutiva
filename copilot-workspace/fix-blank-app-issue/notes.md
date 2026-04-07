# Fix: Blank App Issue — Investigation Notes

**Session:** copilot/fix-blank-app-issue  
**Date:** 2026-04-07

## Problem

The app was showing a blank screen on load.

## Root Cause

`src/lib/supabase.js` called `createClient()` unconditionally. If `VITE_SUPABASE_URL` or `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` env vars were missing (e.g. in local dev or preview deployments), it would throw and crash the app before React could render.

## Changes Made (reverted per user request)

- `src/lib/supabase.js` — guarded `createClient()` so it returns `null` when env vars are missing.
- `src/context/AuthContext.jsx` — added null checks around `supabase` calls.
- `vercel.json` — added SPA rewrite rules.
- `.gitignore` — added standard ignores.
- `package-lock.json` — generated from `npm install`.

## Notes

These changes were reverted at the user's request to keep the repo clean. If the blank app issue resurfaces, the fix is documented here.

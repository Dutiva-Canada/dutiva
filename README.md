# Dutiva

Dutiva is a Vite + React app for generating HR compliance documents and managing a lightweight compliance workspace for Canadian businesses.

## Local setup

Use Node 22 LTS for local development. The current Vite/Rollup toolchain deploys cleanly, but newer bleeding-edge Node releases on Windows can fail to load Rollup's native binary during `npm run build`.

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Create a local env file from the example:

   ```powershell
   Copy-Item .env.example .env.local
   ```

3. Fill in your Supabase project values in `.env.local`.

4. Start the app:

   ```powershell
   npm run dev
   ```

## Supabase setup

The app expects:

- Supabase Auth with email magic links
- A `profiles` table
- A `documents` table
- Row-level security so each user can only access their own rows

### 1. Create a Supabase project

Create a new Supabase project and copy:

- Project URL
- Publishable key

Put those values in `.env.local` or in your hosting platform's environment variables using the names from `.env.example`.

### 2. Apply the schema

Run the SQL in `supabase/migrations/202604070001_initial_schema.sql` using either:

- Supabase SQL Editor
- Supabase CLI migrations

That migration creates:

- `public.profiles`
- `public.documents`
- `updated_at` triggers
- automatic profile creation for new auth users
- row-level security policies for authenticated users

### 3. Configure Auth redirects

In Supabase Auth URL settings, add the URLs your app will use for magic-link redirects.

For local development:

- Site URL: `http://localhost:5173`
- Redirect URL: `http://localhost:5173/auth`

For deployed environments, also add your production domain and its `/auth` route.

The app sends users back to `/auth?next=...`, then redirects them into the correct in-app page after the session is created.

## Verification

Use these commands to verify the app before deploying:

```powershell
npm run lint
npm run build
```

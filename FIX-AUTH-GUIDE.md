# Fix Dutiva Auth — Complete Guide

The magic link auth flow is broken because `dutiva.ca` still points to GitHub Pages instead of Vercel. Here's everything you need to do, in order.

---

## Step 1: Apply the code cleanup (push to GitHub)

A patch file has been saved at `github-pages-cleanup.patch` in this folder. It removes all GitHub Pages artifacts:

- `public/CNAME` (GitHub Pages custom domain file)
- `public/404.html` (GitHub Pages SPA workaround)
- `public/spa-route-404.js` and `public/spa-route-recovery.js`
- `.github/workflows/deploy-pages.yml` (the GitHub Pages deploy workflow)
- The `<script src="/spa-route-recovery.js">` tag from `index.html`
- Updated `README.md` to reflect Vercel hosting

**To apply it:**

```bash
cd your-dutiva-project
git apply github-pages-cleanup.patch
git add -A
git commit -m "Remove GitHub Pages artifacts — app is hosted on Vercel"
git push origin main
```

Or you can make these deletions manually and push.

---

## Step 2: Disable GitHub Pages in the repo

1. Go to https://github.com/Dutiva-Canada/dutiva/settings/pages
2. Under **Source**, set it to **None** (or "Deploy from a branch" with no branch selected)
3. Save — this stops GitHub from serving anything on `dutiva.ca`

---

## Step 3: Add `dutiva.ca` as a custom domain on Vercel

1. Go to https://vercel.com/dutiva-canada/dutiva/settings/domains
2. Click **Add Domain**
3. Type `dutiva.ca` and click **Add**
4. Vercel will show you the DNS records you need to set. Typically:
   - For the apex domain (`dutiva.ca`): **A record** → `76.76.21.21`
   - For `www.dutiva.ca`: **CNAME** → `cname.vercel-dns.com`

---

## Step 4: Update DNS records

Go to your domain registrar (wherever you bought `dutiva.ca`) and update the DNS:

**Remove these (GitHub Pages records):**
- Any A records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- Any CNAME pointing to `dutiva-canada.github.io`

**Add these (Vercel records):**
- **A record**: `@` → `76.76.21.21`
- **CNAME record**: `www` → `cname.vercel-dns.com`

DNS propagation takes 5 minutes to 48 hours (usually under 30 minutes).

---

## Step 5: Verify Vercel environment variables

Go to https://vercel.com/dutiva-canada/dutiva/settings/environment-variables and confirm:

| Variable | Value |
|----------|-------|
| `VITE_SITE_URL` | `https://dutiva.ca` |
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | Your Supabase anon/publishable key |

If `VITE_SITE_URL` is not set, add it. This controls where magic link emails redirect users.

---

## Step 6: Verify Supabase Auth redirect URLs

1. Go to your Supabase dashboard → **Authentication** → **URL Configuration**
2. Set **Site URL** to: `https://dutiva.ca`
3. Under **Redirect URLs**, make sure these are listed:
   - `https://dutiva.ca/**`
   - `https://dutiva.vercel.app/**` (for preview/fallback)
   - `http://localhost:5173/**` (for local dev)

---

## Step 7: Redeploy on Vercel

After pushing the code changes (Step 1), Vercel auto-deploys from `main`. If it doesn't trigger, go to the Vercel dashboard and click **Redeploy** on the latest deployment.

---

## Step 8: Test the auth flow

1. Go to `https://dutiva.ca`
2. Click **Get Started** or navigate to `/auth`
3. Enter your email and click **Send Magic Link**
4. Check your email and click the magic link
5. You should land on `https://dutiva.ca/app` (not a 404)

---

## What was wrong (summary)

The DNS for `dutiva.ca` pointed to GitHub Pages, but the app is deployed on Vercel. When Supabase sent a magic link email, it redirected users to `https://dutiva.ca/auth?next=/app`, which resolved to GitHub Pages and showed a 404. The fix is to point `dutiva.ca` DNS to Vercel instead.

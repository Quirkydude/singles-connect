# Deployment Guide — Vercel + Supabase (Free Tier)

This guide walks you through deploying the Singles Connect Conference registration site **completely free** using **Vercel** for hosting and **Supabase** for the PostgreSQL database.

---

## Why Vercel + Supabase?

| Feature | Vercel (Free) | Supabase (Free) |
|---|---|---|
| Hosting | ✅ Unlimited sites | — |
| Serverless functions | ✅ 100k invocations/month | — |
| Custom domain | ✅ Free | — |
| PostgreSQL database | — | ✅ 500 MB storage |
| Database connections | — | ✅ 60 direct connections |
| Backups | — | ✅ Daily (7-day retention) |

For a conference registration system with hundreds of registrants, both free tiers are more than sufficient.

---

## Step 1 — Set Up Supabase (Database)

### 1.1 Create a Supabase Account & Project

1. Go to [supabase.com](https://supabase.com) and click **Start your project**
2. Sign in with GitHub (recommended)
3. Click **New project**
4. Fill in:
   - **Organization:** Create one if needed (e.g. "COP Assin Fosu")
   - **Project name:** `singles-connect` (or any name)
   - **Database password:** Use a strong password — **save this, you'll need it**
   - **Region:** Choose the closest region (e.g. **West US (North California)** or **EU (Frankfurt)**)
5. Click **Create new project** — wait ~2 minutes for it to spin up

### 1.2 Get Your Database Connection String

1. In your Supabase project, go to **Settings → Database**
2. Scroll down to **Connection string**
3. Select **URI** tab
4. Copy the connection string — it looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with the password you set in step 1.1

> **Important for Vercel:** Supabase requires a connection pooler for serverless environments. Use the **Pooler connection string** instead:
> 1. In Supabase → **Settings → Database → Connection pooling**
> 2. Copy the **Connection string (Transaction mode)**
> 3. It ends in `:6543/postgres` (port 6543, not 5432) and has `pgbouncer=true` in the URL
> 4. Add `?pgbouncer=true` to the URL if not already present

Your final `DATABASE_URL` will look like:
```
postgresql://postgres.xxxxxxxxxxxx:[PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

---

## Step 2 — Push the Database Schema

Before deploying, push your Prisma schema to Supabase:

```bash
# In your project directory:
DATABASE_URL="your-supabase-connection-string" npx prisma db push

# If that works, also seed the admin user:
DATABASE_URL="your-supabase-connection-string" npx prisma db seed
```

You should see `✓ Your database is now in sync with your Prisma schema.`

> You can also run `npx prisma studio` to verify data was seeded correctly.

---

## Step 3 — Push Your Code to GitHub

Vercel deploys directly from GitHub (or GitLab / Bitbucket).

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit — Singles Connect Conference 2026"

# Create a new GitHub repository at github.com/new
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/singles-connect.git
git branch -M main
git push -u origin main
```

---

## Step 4 — Deploy on Vercel

### 4.1 Create a Vercel Account

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub

### 4.2 Import Your Project

1. Click **Add New → Project**
2. Find your `singles-connect` repository and click **Import**
3. Vercel will detect it as a Next.js project automatically
4. **Do NOT deploy yet** — first add your environment variables

### 4.3 Add Environment Variables

In the Vercel project setup screen, click **Environment Variables** and add:

| Name | Value | Notes |
|---|---|---|
| `DATABASE_URL` | `postgresql://...` | Your Supabase pooler connection string |
| `ADMIN_EMAIL` | `admin@yourchurch.org` | Admin login email |
| `ADMIN_PASSWORD` | `YourSecurePassword123!` | Admin login password |
| `SESSION_SECRET` | (random 32+ char string) | Generate with: `openssl rand -hex 32` |
| `ARKESEL_API_KEY` | `your-api-key` | From arkesel.com dashboard |
| `ARKESEL_SENDER` | `SCC2026` | Your approved Arkesel sender ID |
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` | Your Vercel URL (set after first deploy) |

> **Tip for SESSION_SECRET:** On Windows, use [random.org](https://www.random.org/strings/) to generate a 32-character random string. On Mac/Linux: `openssl rand -hex 32`

### 4.4 Deploy

Click **Deploy** and wait ~2 minutes.

Your site will be live at `https://your-project-name.vercel.app` 🎉

---

## Step 5 — Set Up Your Custom Domain (Optional but Recommended)

If you have a domain (e.g. `scc2026.copassinfosu.org`):

1. In Vercel → your project → **Settings → Domains**
2. Click **Add**
3. Enter your domain name
4. Vercel will give you DNS records to add at your domain registrar
5. Once DNS propagates (up to 24 hours), Vercel auto-generates an SSL certificate

> **Free domain option:** If you don't have a domain, your Vercel URL (`https://your-project.vercel.app`) works perfectly fine. Share that link with participants.

---

## Step 6 — Update NEXT_PUBLIC_SITE_URL

After your first deploy, go back to Vercel:
1. **Settings → Environment Variables**
2. Update `NEXT_PUBLIC_SITE_URL` to your actual URL (e.g. `https://scc2026.vercel.app`)
3. Go to **Deployments** and click **Redeploy** on the latest deployment

This ensures the SMS link sent to participants points to the correct URL.

---

## Post-Deployment Checklist

- [ ] Visit the site and check the landing page looks correct
- [ ] Register a test participant and verify the booking appears in admin
- [ ] Log in to `/admin` and confirm the test registration
- [ ] Check if you received an SMS (requires Arkesel key to be set)
- [ ] Test the "Find My Reservation" flow with the test phone number
- [ ] Export CSV from admin to verify the export works

---

## Managing the Database

### View & Edit Data
- **Supabase dashboard:** Go to your project → **Table Editor** to browse registrations
- **Prisma Studio:** Run `DATABASE_URL="..." npx prisma studio` locally to get a visual editor

### Backing Up Data
- Supabase automatically backs up your database daily on the free tier
- To export manually: Supabase → **Database → Backups** → Download

### Adding New Admin Users
Currently admin credentials are set via environment variables. To change:
1. Go to Vercel → **Settings → Environment Variables**
2. Update `ADMIN_EMAIL` and `ADMIN_PASSWORD`
3. Redeploy

---

## Troubleshooting

### "Database connection failed" on Vercel
- Make sure you're using the **Pooler** connection string (port 6543), not the direct connection (port 5432)
- Check `DATABASE_URL` in Vercel environment variables matches exactly what Supabase gave you

### SMS not sending
- Verify `ARKESEL_API_KEY` is set in Vercel environment variables
- Check the **Vercel Function Logs** (Vercel → your project → **Functions**) for SMS error messages
- Test your Arkesel API key using their documentation at [developers.arkesel.com](https://developers.arkesel.com)
- Ensure your sender ID `ARKESEL_SENDER` is approved (or remove it to use default)

### Admin login not working
- Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables in Vercel
- Make sure `SESSION_SECRET` is set (required for cookies to work)

### Prisma schema out of sync
Run this locally (with your production `DATABASE_URL`):
```bash
DATABASE_URL="your-supabase-url" npx prisma db push
```

---

## Cost Summary

| Service | Plan | Monthly Cost |
|---|---|---|
| Vercel | Hobby (Free) | **$0** |
| Supabase | Free tier | **$0** |
| Arkesel SMS | Pay-per-SMS | ~GH₵0.05–0.10/SMS |
| Custom domain | Optional | ~$10–15/year |

**Total running cost: ~$0/month** (plus small SMS costs)

For a conference with 500 participants, the total SMS cost would be approximately **GH₵ 25–50** — very affordable.

---

*For technical support, refer to:*
- *[Vercel Documentation](https://vercel.com/docs)*
- *[Supabase Documentation](https://supabase.com/docs)*
- *[Arkesel Documentation](https://developers.arkesel.com)*

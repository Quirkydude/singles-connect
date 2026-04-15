# Singles Connect Conference 2026 — Registration System

A full-stack web application for managing registrations for the **Singles Connect Conference 2026** by The Church of Pentecost, Assin Fosu Area.

**Theme:** *"Love, Singleness and Marriage"* · 1 Corinthians 7:6-9, Genesis 2:18  
**Dates:** Thursday 30th April – Saturday 2nd May 2026  
**Venues:** PCC (Pentecost Convention Centre) & KNUST

---

## Features

### Public Site
- **Landing page** — Hero banner with flyer, countdown timer, conference details, programme schedule
- **Registration wizard** — 3-step form (personal info → venue → review & submit)
- **Find My Reservation** — Look up registration by phone number or booking reference
- **Success page** — Booking confirmation with reference ID

### Admin Panel (`/admin`)
- **Dashboard** — Stats overview, venue breakdown, participant type charts, recent registrations
- **Registrations list** — Paginated, searchable, filterable by status and participant type
- **Registration detail** — Full registrant profile with confirm/cancel actions
- **CSV export** — Download filtered registration data
- **Secure login** — Session-based admin authentication

### Technical
- Automatic SMS confirmation via **Arkesel** (Ghanaian SMS provider)
- Confirmation reference generation on admin approval
- Mobile-first responsive design

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL via **Prisma ORM** |
| Auth | HTTP-only cookie sessions |
| SMS | Arkesel API v2 |
| Deployment | Vercel (frontend + API) + Supabase (database) |

---

## Local Development

### Prerequisites
- Node.js 18+
- A PostgreSQL database (local or [Supabase](https://supabase.com) free tier)

### Setup

```bash
# 1. Clone and install
git clone <your-repo-url>
cd singles-connect
npm install

# 2. Create your environment file
cp .env.example .env

# 3. Fill in your .env (see Environment Variables section below)

# 4. Push the database schema
npx prisma db push

# 5. Seed the admin user
npx prisma db seed

# 6. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.  
Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Environment Variables

Create a `.env` file in the project root:

```env
# ── Database ──────────────────────────────────────────────
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"

# ── Admin Auth ────────────────────────────────────────────
ADMIN_EMAIL="admin@yourchurch.org"
ADMIN_PASSWORD="your-secure-password"
SESSION_SECRET="a-long-random-string-at-least-32-chars"

# ── SMS — Arkesel ─────────────────────────────────────────
# Get your API key from https://arkesel.com → Dashboard → API
ARKESEL_API_KEY="your-arkesel-api-key"
ARKESEL_SENDER="SCC2026"
# Note: Sender name must be registered/approved by Arkesel first.
# If not yet approved, leave ARKESEL_SENDER blank and SMS will still send
# with Arkesel's default sender.

# ── Site URL (used in SMS links) ──────────────────────────
NEXT_PUBLIC_SITE_URL="https://your-app.vercel.app"
```

> **Important:** Never commit `.env` to git. It is already listed in `.gitignore`.

---

## Arkesel SMS Setup

1. Sign up at [arkesel.com](https://arkesel.com)
2. Go to **Dashboard → API Settings** and copy your API key
3. (Optional but recommended) Register a **Sender ID** like `SCC2026` — this is the name that appears on the recipient's phone. It takes 1–2 business days to be approved.
4. Add `ARKESEL_API_KEY` and `ARKESEL_SENDER` to your environment variables

> If `ARKESEL_API_KEY` is not set, the app still works — it just logs the SMS to the console instead of sending it. Safe for development.

---

## Database Schema (Prisma)

```
Registration {
  id              String   (cuid)
  firstName       String
  lastName        String
  middleName      String?
  gender          String   (male | female)
  email           String   (unique)
  phone           String
  participantType String   (single | facilitator | minister | guest)
  title           String?
  designation     String?
  isNonCOP        Boolean
  region          String
  area            String
  venue           String?  (PCC | KNUST)
  status          String   (pending | confirmed | cancelled)
  confirmationRef String?
  notes           String?
  createdAt       DateTime
  updatedAt       DateTime
}
```

---

## Admin Credentials

After seeding, the default admin is configured via your `.env` file:
- **Email:** `ADMIN_EMAIL`
- **Password:** `ADMIN_PASSWORD`

Change these before deploying to production.

---

## Project Structure

```
singles-connect/
├── app/
│   ├── page.tsx                  ← Landing page
│   ├── register/                 ← Registration wizard
│   │   └── success/              ← Success confirmation
│   ├── my-registration/          ← Find reservation lookup
│   ├── admin/
│   │   ├── dashboard/            ← Admin dashboard
│   │   ├── login/                ← Admin login
│   │   └── registrations/        ← Registration list + detail
│   └── api/                      ← API routes
├── components/
│   ├── landing/                  ← Landing page components
│   ├── registration/             ← Registration wizard components
│   ├── admin/                    ← Admin panel components
│   └── ui/                       ← Reusable UI primitives
├── lib/
│   ├── constants.ts              ← Conference config (name, dates, etc.)
│   ├── sms.ts                    ← Arkesel SMS integration
│   ├── auth.ts                   ← Session auth helpers
│   ├── db.ts                     ← Prisma client
│   └── validations.ts            ← Zod schemas
└── prisma/
    └── schema.prisma             ← Database schema
```

---

## Customising for Your Conference

All conference details are in [`lib/constants.ts`](lib/constants.ts):

```typescript
export const CONFERENCE = {
  name: 'Singles Connect Conference 2026',
  area: 'Assin Fosu Area',
  church: 'The Church of Pentecost',
  startDate: 'Thursday, 30th April 2026',
  endDate: 'Saturday, 2nd May 2026',
  theme: 'Love, Singleness and Marriage',
  // ...
}
```

Edit this file to update dates, venue names, conference rate, etc.

---

## Contributing / Development Notes

- Run `npx prisma studio` to browse the database visually
- Run `npx prisma db push` after changing `schema.prisma`
- The app uses Tailwind CSS v4 — utility classes work as expected
- TypeScript strict mode is enabled — keep it clean

---

*Built for The Church of Pentecost, Assin Fosu Area · Singles Connect Conference 2026*

# Job Tracker & Resume Analyzer

A full-stack web application for tracking job applications and analyzing resumes.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (Supabase) + Prisma ORM
- **Styling:** Tailwind CSS 4, tw-animate-css
- **UI:** shadcn/ui, React Icons
- **State Management:** Redux Toolkit, React Redux
- **Form & Validation:** Formik, Yup
- **Authentication:** NextAuth.js v5 (Auth.js) - Google & GitHub providers + Prisma Adapter
- **Font:** Nunito (next/font)
- **Notifications:** React Toastify
- **Utilities:** clsx, tailwind-merge, class-variance-authority

## Project Structure

```
app/
  (auth)/
    login/          # Login page
    register/       # Register page
  (dashboard)/
    tracker/        # Job application tracker page
    resume/         # Resume analyzer page
    jobs/[id]/      # Application detail page
  api/
    auth/           # NextAuth route handler
    jobs/           # Job CRUD API (GET, POST, PATCH, DELETE)
    stages/         # Stage management API (GET, POST, PUT, DELETE)
prisma/
  schema.prisma     # Database schema (User, Account, Session, JobApplication, Stage)
shared/
  components/       # Navbar, ThemeToggle, DataLoader, etc.
  providers/        # SessionProvider, StoreProvider, ToastProvider
  store/            # Redux store configuration
lib/
  db.ts             # Prisma client singleton
auth.ts             # NextAuth v5 configuration with Prisma adapter
auth.config.ts      # Auth config (Edge-compatible, used by middleware)
middleware.ts       # Route protection (auth middleware)
prisma.config.ts    # Prisma CLI configuration
```

## Features

- Sign in with Google and GitHub
- Protected routes (auth check via middleware)
- Job application tracking with persistent database storage
- Per-user data isolation (each user sees only their own data)
- Customizable application stages (add, remove, reset)
- Resume analysis
- Dark / light theme support
- Responsive design
- Toast notifications

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Required variables:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Supabase Transaction Pooler connection string (port 6543) |
| `DIRECT_URL` | Supabase Direct Connection string (port 5432) |
| `AUTH_SECRET` | Generate with `npx auth secret` |
| `AUTH_GOOGLE_ID` | OAuth Client ID from Google Cloud Console |
| `AUTH_GOOGLE_SECRET` | OAuth Client Secret from Google Cloud Console |
| `AUTH_GITHUB_ID` | OAuth App Client ID from GitHub Developer Settings |
| `AUTH_GITHUB_SECRET` | OAuth App Client Secret from GitHub Developer Settings |

### 3. Set up the database

```bash
npx prisma db push
```

### 4. Google OAuth Setup

1. Create a new project or select an existing one in Google Cloud Console
2. Configure the OAuth Consent Screen
3. Go to Credentials > Create OAuth 2.0 Client ID
4. Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI

### 5. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds for production |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint code checks |
| `npx prisma db push` | Push schema changes to database |
| `npx prisma generate` | Regenerate Prisma Client |


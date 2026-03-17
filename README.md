# Job Tracker & Resume Analyzer

A full-stack web application for tracking job applications and analyzing resumes.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, tw-animate-css
- **UI:** shadcn/ui, React Icons
- **State Management:** Redux Toolkit, React Redux
- **Form & Validation:** Formik, Yup
- **Authentication:** NextAuth.js v5 (Auth.js) - Google & GitHub providers
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
shared/
  components/       # Navbar, ThemeToggle, etc.
  providers/        # SessionProvider, StoreProvider, ToastProvider
auth.ts             # NextAuth v5 configuration
middleware.ts       # Route protection (auth middleware)
```

## Features

- Sign in with Google and GitHub
- Protected routes (auth check via middleware)
- Job application tracking
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

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|---|---|
| `AUTH_SECRET` | Generate with `npx auth secret` |
| `AUTH_GOOGLE_ID` | OAuth Client ID from Google Cloud Console |
| `AUTH_GOOGLE_SECRET` | OAuth Client Secret from Google Cloud Console |
| `AUTH_GITHUB_ID` | OAuth App Client ID from GitHub Developer Settings |
| `AUTH_GITHUB_SECRET` | OAuth App Client Secret from GitHub Developer Settings |

### 3. Google OAuth Setup

1. Create a new project or select an existing one in Google Cloud Console
2. Configure the OAuth Consent Screen
3. Go to Credentials > Create OAuth 2.0 Client ID
4. Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI

### 4. Start the development server

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

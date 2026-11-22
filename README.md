# Patthamon Charaschimpleekul — portfolio

Next.js (App Router) portfolio site, ready for Vercel.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Where to edit

| What | File |
|---|---|
| Home page content (experience, research, projects, skills) | `components/Home.tsx` |
| Project cards + detail pages (research, PC Town) | `components/projects.ts` |
| Email, GitHub, LinkedIn, repo links | `components/site.ts` |
| Colors, fonts, layout | `app/globals.css` (purple palette at the top) |
| Mascot / research figures | `public/mascot/`, `public/figures/` |

To add a project, add an entry to `components/projects.ts` (put its images in
`public/figures/`). It gets a card on the home page and its own page at
`/projects/<slug>` automatically.

## Before deploying

- Export your résumé from Canva as PDF and save it as `public/resume.pdf`.

## Deploy on Vercel

1. Push this folder to a new GitHub repo.
2. On vercel.com → **Add New → Project** → import the repo.
3. Framework preset: **Next.js** (detected automatically) → **Deploy**.

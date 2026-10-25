# GDG Platform

UF GDG's landing page and member platform

## Stack
-  Vite + React + TypeScript + Tailwind
- Firebase (Auth, Firestore,
Storage, Hosting), Cloud Functions

## Repo map

| Path              | What it is         | Owner    |
| ----------------- | ------------------ | -------- |
| `web/`            | Frontend app       | Frontend |
| `functions/`      | Cloud Functions    | Backend  |
| `shared/`         | Shared zod schemas | Backend  |
| `firestore.rules` | Database  rules    | Backend  |

## Setup

### Required software
You will need Git, Node.js, and pnpm.

### Clone and install
```bash
git clone <repo-url>
cd gdg-platform
pnpm install
```

### Run locally

```bash
pnpm dev
```
The web app opens on http://localhost:5173 and connects to the shared Firebase project.

### Optionals: Firebase CLI login

Only needed if you deploy rules or functions to the dev project:
```bash
pnpm exec firebase login
pnpm exec firebase use dev
```

## Notes

1. Read `shared/schemas.ts` to see the data model.
2. Frontend work goes in `web/src`, backend in `functions/src`.
3. Before opening a PR, run to ensure there are no errors
```bash
pnpm lint && pnpm build
```

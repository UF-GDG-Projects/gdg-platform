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

Make sure to copy `web/.env.example` to `web/.env` before running:

```bash
cp web/.env.example web/.env
pnpm dev
```
The web app opens on http://localhost:5173 and connects to the shared Firebase project.

The Firebase web values are client configuration, not service-account credentials.
Do not add private keys or Firebase Admin credentials to the frontend environment.

### Google sign-in and profiles

The Log In and Sign Up pages use Firebase Authentication's Google provider.
Run the local site at `http://localhost:5173` because `localhost` is an
authorized Firebase domain; a numeric address such as `127.0.0.1` is not.

Each signed-in member has a private `profiles/{firebaseUid}` Firestore document.
Profile information and account settings are stored there, while the saved theme
is also cached in the browser so it can be applied before the page renders.

### Optionals: Firebase CLI login

Only needed if you inspect or deploy rules and functions:
```bash
pnpm exec firebase login
pnpm exec firebase use platformgdg
```

## Notes

1. Read `shared/schemas.ts` to see the data model.
2. Frontend work goes in `web/src`, backend in `functions/src`.
3. Before opening a PR, run to ensure there are no errors
```bash
pnpm lint && pnpm build
```

### Gallery projects in Firestore

Gallery content is read live from the `gallery_projects` collection. Each
document supports:
- `title` (string)
- `description` (string)
- `image_urls` (array of up to three image URLs)
- `display_order` (number)
- `is_active` (boolean)
- `text_side` (`left` or `right`, optional)

When the collection has no active documents, the page displays the Figma
projects as a temporary fallback.

Add another document whenever a new project is ready. The page listens for
changes in real time, sorts every active project by `display_order`, and keeps
adding sections down the page. If `text_side` is omitted, the layout alternates
left and right automatically.

### Events in Firestore

Upcoming event cards are read live from the `events` collection. Adding,
editing, or removing an event in Firebase updates the cards without a frontend
code change. The responsive card grid grows automatically with the collection.

Each event document supports:
- `event_id` (string; normally match the document ID)
- `title` (string)
- `description` (string)
- `starts_at`, `ends_at`, `created_at` (Firestore timestamps)
- `location_name` (string)
- `address` (string)
- `points_value` (string)
- `image_url` (optional image URL)

The Google Calendar embed is separate from these detailed event cards, so the
calendar and the matching Firestore event document should both be updated.

### Officers and LinkedIn profiles in Firestore

Officer cards listen to the `officers` collection. To replace a person without
changing the frontend, open **Firebase Console → Firestore Database → Data →
officers**, then edit the document for that position.

Use these stable document IDs for the current positions:
- `president`, `vice-president`, `treasurer`
- `technical-lead-1`, `technical-lead-2`
- `hackathon-lead-1`, `hackathon-lead-2`, `hackathon-lead-3`
- `social-lead`, `marketing-lead`, `outreach-lead`

Each document supports:
- `name` (string)
- `role` (string)
- `image_url` (string containing the officer photo URL)
- `linkedin_url` (full LinkedIn profile URL, or an empty string)
- `display_order` (number)
- `is_active` (boolean)

When a document matches one of the stable position IDs, its values replace that
position's local fallback. New document IDs can add more positions. Setting
`is_active` to `false` hides that position. Every card displays a LinkedIn badge;
filling in `linkedin_url` makes the full officer card open that profile.

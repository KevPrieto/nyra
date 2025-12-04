NYRA — The Minimalist Roadmap Builder for Clarity

NYRA started with a simple frustration:
ideas are easy… clarity is not.

This project is the first MVP of NYRA, a minimalist tool that helps you turn vague ideas into clear, structured, and actionable roadmaps — powered by a lightweight AI assistant.

No clutter.
No dashboards.
No complex productivity systems.

Just clarity.

🚀 What NYRA Does (MVP)

NYRA takes a raw idea from the user — for example:

"I want to build an online store for custom t-shirts"

And transforms it into:

A simple roadmap

Clear phases (Planning, Design, Development, Launch…)

Actionable steps

Fully editable by the user

Stored locally (no login, no server, no database)

All running on a clean, minimal, modern interface.

🧠 The Philosophy Behind NYRA

NYRA is not a task manager.
It's not another productivity suite.
It's not competing with Notion, Asana, or Linear.

NYRA’s role is much simpler:

Turn mental chaos into structured clarity.
Help people think.

AI is used as a copilot, not an autopilot.
If the idea is vague, NYRA asks for more context.
If the user wants control, NYRA stays out of the way.

🏗️ Tech Stack

This MVP is intentionally simple and realistic:

Next.js (App Router)

TypeScript

Tailwind CSS

OpenAI API (gpt-4.1-mini for low cost)

Local state using useState

localStorage for saving roadmaps (Phase 3)

No backend, no auth, no complexity.
A junior dev can build and extend it with AI assistance.

🔧 MVP Features
✔️ Core (Phase 1)

Input an idea

AI generates a structured roadmap

Roadmap displayed as minimal editable columns

Edit steps

Delete steps

✔️ UX (Phase 2)

Clean Notion/Linear-style interface

Smooth layout

Helpful feedback prompts

Simple and beautiful roadmap component

✔️ Local Save (Phase 3)

Auto-save roadmap

Load last roadmap

Clear stored roadmap

(Optional) Export to PDF

❌ Not in the MVP (Future Phases)

These are intentionally out of scope:

Authentication / accounts

Cloud sync

Collaboration

Databases

End-to-end encryption

Mobile app

Workspaces

Sharing features

All will come after validation — not before.

🧩 Project Structure
nyra/
 ├─ app/
 │   ├─ api/
 │   │   └─ generate-roadmap/
 │   │       └─ route.ts
 │   └─ page.tsx
 ├─ components/
 │   ├─ IdeaInput.tsx
 │   ├─ RoadmapView.tsx
 │   ├─ PhaseColumn.tsx
 │   └─ Toolbar.tsx
 ├─ lib/
 │   ├─ types.ts
 │   └─ localStorage.ts
 ├─ public/
 └─ README.md

🧪 How to Run Locally
npm install
npm run dev


Add your OpenAI key:

Create .env.local:

OPENAI_API_KEY=your_key_here


Then open:

👉 http://localhost:3000

🛣️ NYRA Roadmap (Meta-Roadmap)
Phase 0 — Setup

Clean structure + component foundation.

Phase 1 — Core

Idea → AI → roadmap → editable view.

Phase 2 — UX

Minimalist interface + smooth interactions.

Phase 3 — Persistence

localStorage saving + export.

Phase 4 — Future Vision (Not in MVP)

Mobile app, login, cloud sync, collaboration, encryption.

🌱 Why This MVP Matters

Because making progress in life starts with clarity.
NYRA is your starting point — not a productivity monster,
not a complex ecosystem — but a simple tool to think better.

This is version 0.1.
Small, intentional, and genuinely helpful.

More coming soon.

HumanOS — Adaptive Cognitive & Emotional Intelligence Platform

Overview
A research-grade full-stack scaffold for HumanOS: an adaptive cognitive, IQ, and emotional analytics platform. This repository provides a modular starter scaffold (backend + frontend) with stubs for adaptive testing, emotion/behavior pipelines, and secure APIs.

Contents
- backend/: Express.js server, API stubs, adaptive engine skeleton
- frontend/: React + Vite + Tailwind UI starter with onboarding flow
- docs/: architecture and next steps

Running locally (development)
1) Backend:
   - cd backend
   - npm install
   - Set env vars: DATABASE_URL (e.g., postgres://user:pass@localhost:5432/humanos), JWT_SECRET
   - npm run dev

2) Frontend (dev server):
   - cd frontend
   - npm install
   - npm run dev
   - Open the Vite URL (usually http://localhost:5173)

Running production (serve built frontend via backend)
1) cd frontend && npm run build
2) Start backend (it will serve frontend/dist automatically): cd backend && npm start

Notes
- Integration tests: backend npm run test:integration (uses in-memory sqlite)
- For full functionality install Postgres and set DATABASE_URL appropriately

Security & Ethics
Includes consent, RBAC and privacy design notes in docs/architecture.md

License: MIT

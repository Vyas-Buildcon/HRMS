# Vyas HRMS

```
vyas-hrms/
├── frontend/          React 19 + Vite + Tailwind SPA (dev server on :3000)
│   ├── src/           pages, components, services, types, shared (salaryStructure.ts)
│   ├── public/        static assets (favicon, PDFs)
│   └── index.html
└── backend/           FastAPI + MongoDB API (Python, on :5000)
    ├── main.py        FastAPI entry point
    ├── app/
    │   ├── main.py    application setup (routers, error handling, static files)
    │   ├── config.py  settings read from backend/.env
    │   ├── routes/    API endpoints, one module per area (auth, employees, payroll, ...)
    │   ├── auth/      JWT + bcrypt, RBAC permissions
    │   ├── stores/    in-memory data stores and the initial seed data
    │   ├── database/  MongoDB / JSON-file persistence
    │   ├── services/  mailer (Resend, Brevo, SMTP)
    │   ├── utils/     salary structure, geofence, overtime, JS-compatible helpers
    │   └── templates/ letter template gallery
    ├── scripts/       backend maintenance and seed scripts
    ├── data/          local JSON copy of the data (hrms_store.json)
    ├── uploads/       runtime uploads (created automatically, git-ignored)
    ├── archive/       inactive FastAPI prototype (not used by the app)
    └── requirements.txt
```
The backend has one virtual environment at `backend/.venv`. The root `package.json` holds launcher scripts for both apps.

## Prerequisites
- Python 3.12+ (tested with 3.14) and Node.js 20+
- MongoDB running locally (or set `MONGODB_URI`); without it the data is kept in `backend/data/hrms_store.json`

## Setup
```bash
npm install          # root helper (concurrently)
npm run install:all  # backend/.venv + Python packages, frontend packages
```
Copy `backend/.env.example` to `backend/.env` and fill in secrets (JWT, mail, Gemini).
Optionally copy `frontend/.env.example` to `frontend/.env`.

## Run (development)
```bash
npm run dev          # backend on http://localhost:5000, frontend on http://localhost:3000
```
Open http://localhost:3000. The Vite dev server proxies `/api` and `/uploads` to the backend.
Interactive API docs: http://localhost:5000/api/docs

Run them separately with `npm run dev:backend` / `npm run dev:frontend`, or start the backend by hand:
```powershell
cd backend
.venv\Scripts\Activate.ps1
uvicorn main:app --reload --port 5000
```

## Demo data
```bash
npm run seed:demo    # stop the backend first
```
Adds connected sample data for every page (employees, attendance, leave, payroll, documents,
recruitment, assets, insurance, tax, notifications, ...) around the demo logins in
`backend/app/stores/db_store.py` (`DEMO_ACCOUNTS`). It only adds records that are missing, so
existing data is kept and re-running it is safe. Other seeded colleagues log in with `Demo@12345`.

## Production
```bash
npm run build        # builds frontend/dist
npm start            # backend serves the API and frontend/dist on :5000
```

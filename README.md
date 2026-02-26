# Appointments & CRM System

Production-style starter for booking + CRM workflows (clinics, centers, SMB services).

## What is included

### Backend (`backend/`)
- JWT authentication (register/login).
- Role-based authorization (`admin`, `user`).
- Services management (price, duration, activation).
- Appointments flow (create/list/update/cancel, statuses).
- Reporting endpoint for admin dashboard (appointments + revenue).
- Pagination + search helpers.
- Request validation + centralized error handling.

### Frontend (`frontend/`)
- React + Vite + Tailwind setup.
- Axios API client.
- React Query integration.
- Basic dashboard and booking pages to extend.

## API overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/services`
- `POST /api/services` (admin)
- `PATCH /api/services/:id` (admin)
- `GET /api/appointments`
- `POST /api/appointments`
- `PATCH /api/appointments/:id`
- `GET /api/reports/overview` (admin)

## Quick start

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment sample (`backend/.env.example`)

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/appointments_crm
JWT_SECRET=replace-me
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

## Suggested next upgrades
- Real staff availability calendar with conflict checks per employee.
- Email/in-app notifications + WebSocket live updates.
- Stripe test mode checkout and invoice records.
- Multi-tenant SaaS mode (`organizationId` on core models).

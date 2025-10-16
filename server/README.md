# Qorlia API

Node.js (Express + TypeScript) service that powers authentication, subscriptions, and infrastructure automation for Qorlia.

## Getting started

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

The HTTP API defaults to `http://localhost:4000`.

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reloading. |
| `npm run build` | Compile TypeScript to `dist/`. |
| `npm run start` | Run the compiled server. |
| `npm run lint` | Run ESLint across the source files. |
| `npm run typecheck` | Perform a no-emit TypeScript check. |

## API surface (MVP)

- `POST /api/auth/register` – Create a new account (in-memory store for now).
- `POST /api/auth/login` – Exchange credentials for JWT tokens.
- `POST /api/auth/refresh` – Refresh access tokens.
- `GET /api/subscriptions/plans` – List available SaaS plans.
- `POST /api/subscriptions` – Create a subscription (returns mock payment link).
- `GET /api/subscriptions/:id` – Inspect a subscription.
- `POST /api/subscriptions/:id/cancel` – Cancel a subscription.
- `POST /api/subscriptions/:id/resume` – Resume a cancelled subscription.
- `POST /api/provisioning/workspaces` – Queue a workspace provisioning job.
- `GET /api/provisioning/workspaces` – List queued workspaces.
- `GET /api/provisioning/workspaces/:id` – Inspect a provisioning job.
- `POST /api/provisioning/workspaces/:id/destroy` – Mark a workspace for teardown.
- `GET /api/health` – Service health check.

All domain services currently operate with in-memory storage and mocked integrations. Replace with persistent stores and real payment/IaC providers during the next milestone.

## Next steps

1. Wire PostgreSQL via Prisma or Knex for persistent data.
2. Integrate Stripe/Razorpay APIs (create checkout session, webhook handling).
3. Implement Terraform runner (batch jobs/queue) and connect to provisioning service.
4. Extend authentication with organisation accounts and role-based access control.
5. Harden security (rate limiting, request validation, audit logging).


# Backend Architecture Overview

This document outlines the planned Node.js / Express service that powers Qorlia’s managed open-source SaaS platform.

## Guiding Principles

- **Modular domains**: Each business capability (authentication, subscriptions, provisioning) lives in an isolated module with its own routes, controllers, services, and data access layer.
- **Type safety**: The project is built with TypeScript to reduce runtime errors and keep complex orchestration logic maintainable.
- **Infrastructure as Code first**: Provisioning flows are abstracted behind orchestration services that ultimately call Terraform (or other IaC tooling) via a job runner. The first iteration stubs these integrations, providing clear extension points.
- **Cloud ready**: Environment configuration relies on dotenv for local development and secrets in production. HTTP hardening is handled by Helmet and rate limiting middleware.
- **Event-driven roadmap**: Long-term, provisioning and subscription lifecycle events will emit to a queue (e.g., Redis, SQS) for asynchronous processing.

## High-Level Modules

### 1. Authentication & Accounts
- Sign-up, sign-in, refresh-token endpoints.
- Password hashing (BCrypt) and JWT issuance.
- Organisation support for multi-user tenant management (roadmap).

### 2. Subscription Management
- Plan catalogue (Bahmni, ERPNext, bundles).
- Subscription lifecycle: create, trial, activate, cancel, resume.
- Billing provider integration (Stripe/Razorpay) via provider adapters.
- Webhook ingestion for payment events (roadmap).

### 3. Provisioning & IaC Orchestration
- Workspace APIs for requesting new environments.
- Job tracking for Terraform runs (init, apply, destroy).
- Domain automation hooks (Route53, Cloudflare) – initial version returns mock responses.
- Audit trail for environment changes.

### 4. Admin & Metrics (roadmap)
- Internal dashboards for monitoring tenants, usage, and health.
- Alerting hooks for failed provisioning jobs.

## Project Structure

```
server/
  src/
    app.ts               // Express app configuration
    server.ts            // HTTP server bootstrap
    config/              // env, logging, database bootstrap
    middleware/          // auth, error handling, rate limiting
    modules/
      auth/
      subscriptions/
      provisioning/
      health/
    routes.ts            // API router aggregator
  tests/                 // Unit/integration tests (roadmap)
  package.json
  tsconfig.json
```

## Data & Integrations

- **Database**: PostgreSQL (via Prisma or Knex). First iteration uses an in-memory repository interface so controllers are testable before wiring a real DB.
- **Queue**: Hook for BullMQ/Redis to process long-running provisioning workflows.
- **Terraform runner**: CLI invocation executed by a worker (later). Initial API returns `202 Accepted` with a mock job identifier.

## Security Considerations

- Rate limiting and Helmet to reduce common attack surfaces.
- Input validation via Zod schemas.
- Secrets loaded from environment variables; no secrets committed to git.
- Auditable logs with contextual request IDs.

## Deployment Roadmap

1. **MVP API** – Auth, subscription skeleton, provisioning request endpoints with stubbed services.
2. **Persistent storage** – Wire PostgreSQL + Prisma migrations.
3. **Payments** – Integrate Stripe/Razorpay, handle webhooks, align with subscription states.
4. **IaC execution** – Implement Terraform runner, with secure state storage (S3 + Dynamo or Terraform Cloud).
5. **Domain automation** – Add Cloudflare/Route53 providers for custom domain assignment.
6. **Admin UI** – Build internal dashboard for operators.

This plan keeps the backend extensible while enabling frontend & sales teams to demo subscription flows quickly. Each module can now be scaffolded following the structure above.


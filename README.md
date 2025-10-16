# Qorlia

Qorlia delivers open-source software services and pragmatic AI augmentations that help organisations modernise operations without vendor lock-in.

## What We Do

- **Managed Open-Source Deployments** – Tailored implementations, hosting, and lifecycle support for battle-tested platforms like Bahmni (healthcare) and ERPNext (business management), with localisation for Indian and global teams.
- **AI Integration Layers** – Practical enhancements that turn existing data into guided workflows, predictive insights, and decision support, delivered via modular APIs and automation.
- **Infrastructure as Code** – Terraform-driven provisioning, observability, and security hardening so clients can run mission-critical workloads on cloud or co-located hardware with confidence.

## Why Qorlia

- **Proven Delivery** – Production experience rolling out Bahmni and ERPNext to multiple clients, with domain playbooks for healthcare and SME back-office operations.
- **Open-Source First** – Commitment to upstream compliance, contributions, and transparent pricing tied to value—not proprietary lock-in.
- **Scalable Engagement** – Subscription-based SaaS hosting today, with a roadmap to dedicated server footprints for customers who outgrow the cloud.
- **AI Without the Hype** – Focus on measurable productivity gains, from automated data entry to analytics and forecasting that align with each client’s reality.

## Current Offerings

| Service | Summary | Ideal For |
| --- | --- | --- |
| Bahmni Managed Service | End-to-end deployment, localised configuration, integrations with diagnostic systems, and ongoing support tailored for Indian hospitals and clinics. | Healthcare providers needing digital patient records and streamlined operations. |
| ERPNext Managed Service | Implementation, customisation, hosting, and support for finance, operations, and customer engagement processes. | SMEs seeking an affordable, extensible ERP with strong community backing. |
| AI Enablement | Workflow automation, data integrations, and analytics overlays that complement existing systems. | Teams wanting quick wins from AI without rebuilding their stack. |
| Infrastructure as Code | Terraform blueprints, CI/CD pipelines, and observability to keep deployments reliable and compliant. | Organisations standardising deployments across environments. |

## Roadmap

- Expand catalog to additional open-source SaaS offerings with clear licensing paths.
- Launch self-service provisioning portal with subscription management.
- Offer optional co-located hosting for scale-driven cost efficiencies.
- Build knowledge base and playbooks for regulated industries and global rollouts.

## Pricing considerations

- **Managed SaaS margin targets:** Typical managed open-source service providers aim for 35–55% gross margin after cloud infrastructure costs, support labour, and licensing obligations. Early-stage teams often begin near 30% while tooling and processes mature.
- **Bundled project work:** Implementation/consulting engagements commonly bill at 2.5–3× blended engineer cost to cover bench time, presales, and delivery risk.
- **AI add-ons:** Productised AI features (dashboards, copilots) can command a 15–25% uplift over the core platform subscription when they reduce measurable manual effort.
- Track infrastructure cost per tenant by component (compute, storage, backups, monitoring) to decide when shifting to co-located hardware improves margin; target payback within 12–18 months for capex moves.

## Website

- The landing experience now runs on Vite + React with Framer Motion animations (see `src/`).
- Install dependencies with `npm install`, start a dev server via `npm run dev`, and build for production using `npm run build`.
- GitHub Pages deployment is automated via `.github/workflows/deploy.yml`. Make sure the Pages settings are set to **Deploy from a branch → gh-pages / (root)** so the workflow output is published.
- Generated assets live under `dist/` after a production build; deploy the folder to any static host if you prefer an alternative target.
- The dark theme and brand visuals live in `src/App.css`; adjust colours and motion settings beside the component markup in `src/App.jsx`.

### Contact form

- Form submissions are powered by Formspree. Create a form at <https://formspree.io/> using the email `ash.191245141@gmail.com` and note the endpoint URL (e.g., `https://formspree.io/f/abcd1234`).
- Add the endpoint to an environment file for local work:

  ```bash
  echo "VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/abcd1234" > .env.local
  ```

- In production, add the same value as a repository secret named `VITE_FORMSPREE_ENDPOINT`; the deployment workflow injects it during `npm run build`.
- Until the endpoint is configured, the form surfaces a notice and keeps a mailto fallback alive.

## Connect

- Questions & collaborations: `hello@qorlia.com`
- Interested in partnering or piloting a deployment? Open an issue or reach out directly.

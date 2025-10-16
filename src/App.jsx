import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import logo from "./assets/logo.svg";

const formEndpointDefault = "https://formspree.io/f/your-form-id";
const FORM_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT && import.meta.env.VITE_FORMSPREE_ENDPOINT.trim() !== ""
    ? import.meta.env.VITE_FORMSPREE_ENDPOINT
    : formEndpointDefault;

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#platforms", label: "Platforms" },
  { href: "#ai", label: "AI Enablement" },
  { href: "#infrastructure", label: "Infrastructure" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Talk to Us" },
];

const services = [
  {
    title: "Managed Deployments",
    description:
      "Discovery, configuration, user transition, and proactive operations for mission-critical open-source platforms.",
    bullets: [
      "Healthcare & ERP domain playbooks",
      "Custom workflows and interoperability",
      "Observability and 24×7 support",
    ],
  },
  {
    title: "Applied AI Enablement",
    description:
      "Stack-agnostic automation, forecasting, and copilots that integrate with Bahmni, ERPNext, and adjacent systems.",
    bullets: [
      "Data readiness and pipeline orchestration",
      "Human-in-the-loop workflow coaching",
      "Governance, auditability, and feedback loops",
    ],
  },
  {
    title: "Infrastructure as Code",
    description:
      "Terraform-driven reference architectures, GitOps pipelines, and security hardening across cloud to co-located racks.",
    bullets: [
      "Multi-cloud blueprints & policy guardrails",
      "Secrets and backup automation",
      "SLO-driven runbooks and expansion planning",
    ],
  },
];

const platforms = [
  {
    category: "Healthcare",
    name: "Bahmni",
    body:
      "Patient-centric hospital management built for India. Localised experiences, lab integrations, and clinician-ready training.",
    bullets: [
      "OP/IP, pharmacy, billing, diagnostics",
      "Regional language UI & intuitive flows",
      "HL7 / FHIR bridges and telehealth",
    ],
  },
  {
    category: "Business Operations",
    name: "ERPNext",
    body:
      "Unified ERP for finance, supply chain, and customer success. Tuned to your chart of accounts and compliance posture.",
    bullets: [
      "GST-ready invoicing & e-way bill support",
      "Manufacturing, services, retail modules",
      "Mobile, portal, and analytics rollout",
    ],
  },
  {
    category: "Future Catalog",
    name: "Open-source SaaS Portfolio",
    body:
      "Continuous evaluation of open platforms you can trust. Transparent licensing and sustainable lifecycle management.",
    bullets: [
      "CRM, HR, data, and observability stacks",
      "Licensing diligence & community health",
      "Pilot sandboxes and adoption playbooks",
    ],
  },
];

const aiPills = [
  "Automation copilots",
  "Predictive analytics",
  "Document intelligence",
  "Chat & voice assistants",
  "Continuous learning loops",
];

const aiAccelerators = [
  "Bahmni voice triage workflows for clinicians",
  "ERPNext demand forecasting for procurement teams",
  "Compliance bots flagging anomalies in real time",
  "Unified dashboards overlaying KPIs from multiple systems",
];

const infraPills = [
  "Cost visibility dashboards",
  "Capacity planning",
  "Security hardening",
  "Disaster recovery drills",
  "Support playbooks",
];

const timeline = [
  {
    title: "Discover",
    body:
      "Rapid assessments, workshops, and stakeholder alignment to map the outcomes that matter most.",
  },
  {
    title: "Design & Pilot",
    body:
      "Proofs of value validate integrations, data flows, and user experience before broad rollout.",
  },
  {
    title: "Launch",
    body:
      "Production deployments with observability, runbooks, and enablement so teams stay confident from day one.",
  },
  {
    title: "Operate & Scale",
    body:
      "Optimization, AI-led enhancements, and roadmap planning keep operations ahead of growth.",
  },
];

const fadeIn = (delay = 0, y = 24) => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  },
});

const scaleUp = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 2400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.add("dark-surface");
    return () => document.body.classList.remove("dark-surface");
  }, []);

  useEffect(() => {
    if (!navOpen) return;
    const handler = (event) => {
      if (!event.target.closest(".site-header")) {
        setNavOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [navOpen]);

  const formDisabled = FORM_ENDPOINT === formEndpointDefault;

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    if (formDisabled) {
      setFormError("Contact form endpoint not configured yet. Update VITE_FORMSPREE_ENDPOINT.");
      return;
    }
    const form = event.currentTarget;
    const data = new FormData(form);
    setFormStatus("submitting");
    setFormError("");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (response.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        const result = await response.json().catch(() => null);
        const message = result?.errors?.[0]?.message || "We couldn't send the message. Try again.";
        setFormError(message);
        setFormStatus("error");
      }
    } catch (error) {
      setFormError("Network error. Please try again.");
      setFormStatus("error");
    }
  };

  return (
    <LayoutGroup>
      <div className={`app-shell ${navOpen ? "nav-open" : ""}`}>
        <AnimatePresence mode="wait">
          {showIntro && (
            <IntroOverlay key="intro-overlay" />
          )}
        </AnimatePresence>
        <Header showBrand={!showIntro} navOpen={navOpen} onToggle={() => setNavOpen((v) => !v)} />
        <AnimatePresence>
          {navOpen && (
            <motion.nav
              key="mobile-nav"
              className="mobile-nav"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setNavOpen(false)}>
                  {link.label}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        <main>
          <motion.section
            className="hero"
            initial="hidden"
            animate="visible"
            variants={fadeIn(0)}
          >
            <div className="container hero-grid">
              <motion.div className="hero-copy" variants={fadeIn(0)} initial="hidden" animate="visible">
                <motion.p className="eyebrow" variants={fadeIn(0.1)}>
                  Open source first · Applied AI where it counts
                </motion.p>
                <motion.h1 variants={fadeIn(0.2)}>
                  Build resilient operations with open-source platforms and pragmatic AI.
                </motion.h1>
                <motion.p className="lead" variants={fadeIn(0.3)}>
                  Qorlia combines deployed experience across Bahmni and ERPNext with automation
                  accelerators that boost productivity for teams in India and globally.
                </motion.p>
                <motion.div className="hero-actions" variants={fadeIn(0.4)}>
                  <a className="btn primary" href="#contact">
                    Book a strategy call
                  </a>
                  <a className="btn ghost" href="#services">
                    Explore our services
                  </a>
                </motion.div>
                <motion.div className="badge-row" variants={fadeIn(0.5)}>
                  {["Bahmni specialists", "ERPNext certified", "Terraform IaC"].map((badge) => (
                    <motion.span key={badge} className="badge" whileHover={{ scale: 1.05 }}>
                      {badge}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div className="hero-visual" variants={scaleUp} initial="hidden" animate="visible">
                <div className="orbital">
                  <motion.div
                    className="orbital-ring"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                  />
                  <motion.div
                    className="orbital-core"
                    animate={{ boxShadow: ["0 0 40px rgba(248, 113, 113, 0.3)", "0 0 80px rgba(59, 130, 246, 0.35)", "0 0 40px rgba(248, 113, 113, 0.3)"] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  >
                    <motion.div
                      className="metric"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <span className="metric-label">Patient wait time</span>
                      <span className="metric-value">-27%</span>
                    </motion.div>
                    <motion.div
                      className="metric"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    >
                      <span className="metric-label">Inventory accuracy</span>
                      <span className="metric-value">+34%</span>
                    </motion.div>
                    <motion.div
                      className="metric"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                    >
                      <span className="metric-label">Revenue visibility</span>
                      <span className="metric-value">Real-time</span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            id="services"
            className="section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn(0)}
          >
            <div className="container">
              <motion.div className="section-header" variants={fadeIn(0.1)}>
                <h2>Services tailored for measurable impact</h2>
                <p>
                  Consulting, engineering, and operations bundled into engagements that accelerate modernisation without lock-in.
                </p>
              </motion.div>
              <div className="card-grid">
                {services.map((service, index) => (
                  <motion.article
                    key={service.title}
                    className="card"
                    variants={fadeIn(0.15 * index)}
                    whileHover={{ translateY: -8, borderColor: "rgba(236, 72, 153, 0.6)" }}
                  >
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul>
                      {service.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            id="platforms"
            className="section alt"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn(0)}
          >
            <div className="container">
              <motion.div className="section-header" variants={fadeIn(0.1)}>
                <h2>Platforms we operate and extend</h2>
                <p>
                  Trusted open-source ecosystems with thriving communities—implemented with configurations that match your reality.
                </p>
              </motion.div>
              <div className="platform-grid">
                {platforms.map((platform, index) => (
                  <motion.article
                    key={platform.name}
                    className="platform-card"
                    variants={fadeIn(0.12 * index)}
                    whileHover={{ translateY: -10, boxShadow: "0 30px 60px rgba(236, 72, 153, 0.25)" }}
                  >
                    <span className="platform-badge">{platform.category}</span>
                    <h3>{platform.name}</h3>
                    <p>{platform.body}</p>
                    <ul>
                      {platform.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            id="ai"
            className="section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeIn(0)}
          >
            <div className="container two-column">
              <motion.div variants={fadeIn(0.1)}>
                <h2>AI enablement grounded in outcomes</h2>
                <p>
                  We start with measurable KPIs, data readiness, and governance. Iterative experiments surface ROI within weeks, not quarters.
                </p>
                <div className="pill-list">
                  {aiPills.map((pill) => (
                    <motion.span key={pill} whileHover={{ scale: 1.05 }}>
                      {pill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
              <motion.div className="highlight-card" variants={fadeIn(0.2)}>
                <h3>Sample accelerators</h3>
                <ul>
                  {aiAccelerators.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            id="infrastructure"
            className="section alt"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeIn(0)}
          >
            <div className="container two-column reverse">
              <motion.div className="highlight-card" variants={fadeIn(0.1)}>
                <h3>Terraform-driven infrastructure</h3>
                <p>
                  Codified environments launch, clone, or migrate workloads with confidence. Reusable modules and runbooks align to your security posture.
                </p>
                <ul>
                  <li>Multi-cloud templates for AWS, Azure, and GCP</li>
                  <li>GitOps deployment pipelines</li>
                  <li>Policy-as-code guardrails</li>
                  <li>Secrets management and backup automation</li>
                </ul>
              </motion.div>
              <motion.div variants={fadeIn(0.2)}>
                <h2>Scale from cloud to co-located racks</h2>
                <p>
                  Launch fast on managed cloud, then transition to dedicated hardware once economics favour owned capacity. We orchestrate the entire lifecycle.
                </p>
                <div className="pill-list">
                  {infraPills.map((pill) => (
                    <motion.span key={pill} whileHover={{ scale: 1.05 }}>
                      {pill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            id="approach"
            className="section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn(0)}
          >
            <div className="container">
              <motion.div className="section-header" variants={fadeIn(0.1)}>
                <h2>How we partner with your team</h2>
                <p>Transparent milestones keep transformation predictable and stress-free.</p>
              </motion.div>
              <div className="timeline">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="timeline-item"
                    variants={fadeIn(0.12 * index)}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="timeline-marker">{index + 1}</div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            id="cta"
            className="section cta-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn(0)}
          >
            <div className="container cta-container">
              <motion.div variants={fadeIn(0.1)}>
                <h2>Let’s build your next advantage</h2>
                <p>
                  Digitising hospital networks, streamlining manufacturing, or rebooting back-office operations—Qorlia brings the open-source foundations and AI accelerators you need.
                </p>
              </motion.div>
              <motion.a className="btn primary" href="#contact" variants={fadeIn(0.2)}>
                Schedule a consultation
              </motion.a>
            </div>
          </motion.section>

          <motion.section
            id="contact"
            className="section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn(0)}
          >
            <div className="container contact-grid">
              <motion.div variants={fadeIn(0.1)}>
                <h2>Talk to the Qorlia team</h2>
                <p>
                  Share your current challenges and ambitions—we'll respond with a tailored rollout plan within two business days.
                </p>
                <div className="contact-card">
                  <div>
                    <h3>Email</h3>
                    <a href="mailto:hello@qorlia.com">hello@qorlia.com</a>
                  </div>
                  <div>
                    <h3>Headquarters</h3>
                    <p>Bengaluru, India · Serving clients globally</p>
                  </div>
                </div>
              </motion.div>
              <motion.form
                className="contact-form"
                aria-label="contact form"
                variants={fadeIn(0.2)}
                onSubmit={handleContactSubmit}
              >
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@company.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" type="text" placeholder="Company name" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">How can we help?</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Tell us about your goals..."
                    required
                  />
                </div>
                <button type="submit" className="btn primary" disabled={formStatus === "submitting"}>
                  {formStatus === "submitting" ? "Sending…" : "Send message"}
                </button>
                <div className="form-footnote">
                  {formStatus === "success" && <span className="form-success">Thank you! We'll reach out soon.</span>}
                  {formError && <span className="form-error">{formError}</span>}
                  {formDisabled && !formError && (
                    <span>
                      Configure Formspree to enable this form. Until then, email us directly at{" "}
                      <a href="mailto:hello@qorlia.com">hello@qorlia.com</a>.
                    </span>
                  )}
                  {!formDisabled && formStatus === "idle" && !formError && (
                    <span>
                      Prefer email? Write to us at <a href="mailto:hello@qorlia.com">hello@qorlia.com</a>.
                    </span>
                  )}
                </div>
              </motion.form>
            </div>
          </motion.section>
        </main>

        <Footer />
      </div>
    </LayoutGroup>
  );
}

function Header({ showBrand, navOpen, onToggle }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <AnimatePresence mode="wait">
            {showBrand && (
              <motion.div
                className="brand-mark"
                layoutId="brand-icon"
                key="brand-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <img src={logo} alt="Qorlia logo" />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {showBrand && (
              <motion.span
                className="brand-name"
                layoutId="brand-name"
                key="brand-name"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
              >
                Qorlia
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <nav className="nav">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="menu-toggle"
          aria-expanded={navOpen}
          aria-controls="mobile-nav"
          onClick={() => onToggle()}
        >
          <span className="sr-only">Toggle navigation</span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

function IntroOverlay() {
  return (
    <motion.div
      className="intro-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut", delay: 1.2 }}
    >
      <motion.div
        className="intro-card"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="intro-logo"
          layoutId="brand-icon"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src={logo} alt="Qorlia logo" />
        </motion.div>
        <motion.span
          className="intro-name"
          layoutId="brand-name"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Qorlia
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Open-source software · Applied intelligence
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand">
            <div className="brand-mark">
              <img src={logo} alt="Qorlia logo" />
            </div>
            <span className="brand-name">Qorlia</span>
          </div>
          <p className="footer-copy">
            Open-source software, applied AI, and infrastructure automation that keeps your operations resilient.
          </p>
        </div>
        <div>
          <h3>Quick links</h3>
          <ul>
            {navLinks.slice(0, 4).map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Get updates</h3>
          <p>Join our mailing list for launch announcements and case studies.</p>
          <form className="subscribe-form" aria-label="subscribe">
            <label className="sr-only" htmlFor="subscribe-email">
              Email
            </label>
            <input id="subscribe-email" type="email" placeholder="you@company.com" disabled />
            <button type="submit" className="btn secondary" disabled>
              Notify me
            </button>
            <p className="form-footnote">
              Coming soon. Reach out at <a href="mailto:hello@qorlia.com">hello@qorlia.com</a>.
            </p>
          </form>
        </div>
      </div>
      <div className="container footer-meta">
        <span>&copy; {new Date().getFullYear()} Qorlia. All rights reserved.</span>
        <span>Open-source first · Built from India for the world.</span>
      </div>
    </footer>
  );
}

export default App;

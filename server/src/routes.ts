import { Router } from "express";
import { healthRouter } from "./modules/health/health.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { subscriptionRouter } from "./modules/subscriptions/subscription.routes.js";
import { provisioningRouter } from "./modules/provisioning/provisioning.routes.js";

const router = Router();

router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/subscriptions", subscriptionRouter);
router.use("/provisioning", provisioningRouter);

export default router;


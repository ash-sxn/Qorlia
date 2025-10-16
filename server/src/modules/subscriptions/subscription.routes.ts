import { Router } from "express";
import {
  cancelSubscription,
  createSubscription,
  getSubscription,
  listPlans,
  resumeSubscription,
} from "./subscription.controller.js";

export const subscriptionRouter = Router();

subscriptionRouter.get("/plans", listPlans);
subscriptionRouter.post("/", createSubscription);
subscriptionRouter.get("/:id", getSubscription);
subscriptionRouter.post("/:id/cancel", cancelSubscription);
subscriptionRouter.post("/:id/resume", resumeSubscription);


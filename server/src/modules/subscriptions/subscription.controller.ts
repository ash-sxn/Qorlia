import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../../utils/async-handler.js";
import {
  createSubscriptionSchema,
  subscriptionIdParamSchema,
} from "./subscription.schemas.js";
import { SubscriptionService } from "./subscription.service.js";

const subscriptionService = new SubscriptionService();

export const listPlans = asyncHandler(async (_req, res) => {
  const plans = subscriptionService.listPlans();
  res.status(StatusCodes.OK).json({ plans });
});

export const createSubscription = asyncHandler(async (req, res) => {
  const payload = createSubscriptionSchema.parse(req.body);
  const result = await subscriptionService.createSubscription(payload);
  res.status(StatusCodes.ACCEPTED).json(result);
});

export const getSubscription = asyncHandler(async (req, res) => {
  const { id } = subscriptionIdParamSchema.parse(req.params);
  const subscription = await subscriptionService.getSubscription(id);
  res.status(StatusCodes.OK).json({ subscription });
});

export const cancelSubscription = asyncHandler(async (req, res) => {
  const { id } = subscriptionIdParamSchema.parse(req.params);
  const subscription = await subscriptionService.cancelSubscription(id);
  res.status(StatusCodes.OK).json({ subscription });
});

export const resumeSubscription = asyncHandler(async (req, res) => {
  const { id } = subscriptionIdParamSchema.parse(req.params);
  const subscription = await subscriptionService.resumeSubscription(id);
  res.status(StatusCodes.OK).json({ subscription });
});


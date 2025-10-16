import { z } from "zod";

export const createSubscriptionSchema = z.object({
  customerEmail: z.string().email(),
  customerName: z.string().min(1),
  planId: z.string().min(1),
  workspaceName: z.string().min(3),
});

export const subscriptionIdParamSchema = z.object({
  id: z.string().uuid("Subscription id must be a valid UUID."),
});

export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;
export type SubscriptionIdParam = z.infer<typeof subscriptionIdParamSchema>;


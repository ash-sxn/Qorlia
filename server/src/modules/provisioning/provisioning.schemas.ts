import { z } from "zod";

export const createWorkspaceSchema = z.object({
  subscriptionId: z.string().uuid(),
  stack: z.enum(["bahmni", "erpnext", "bundle"]),
  region: z.string().default("ap-south-1"),
  domain: z.string().min(4),
});

export const workspaceIdParamSchema = z.object({
  id: z.string().uuid(),
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type WorkspaceIdParam = z.infer<typeof workspaceIdParamSchema>;


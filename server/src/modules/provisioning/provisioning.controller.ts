import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../../utils/async-handler.js";
import {
  createWorkspaceSchema,
  workspaceIdParamSchema,
} from "./provisioning.schemas.js";
import { ProvisioningService } from "./provisioning.service.js";

const provisioningService = new ProvisioningService();

export const requestWorkspace = asyncHandler(async (req, res) => {
  const payload = createWorkspaceSchema.parse(req.body);
  const result = await provisioningService.requestWorkspace(payload);
  res.status(StatusCodes.ACCEPTED).json(result);
});

export const listWorkspaces = asyncHandler(async (_req, res) => {
  const workspaces = await provisioningService.listWorkspaces();
  res.status(StatusCodes.OK).json({ workspaces });
});

export const getWorkspace = asyncHandler(async (req, res) => {
  const { id } = workspaceIdParamSchema.parse(req.params);
  const workspace = await provisioningService.getWorkspace(id);
  res.status(StatusCodes.OK).json({ workspace });
});

export const destroyWorkspace = asyncHandler(async (req, res) => {
  const { id } = workspaceIdParamSchema.parse(req.params);
  const workspace = await provisioningService.destroyWorkspace(id);
  res.status(StatusCodes.OK).json({ workspace });
});


import { Router } from "express";
import {
  destroyWorkspace,
  getWorkspace,
  listWorkspaces,
  requestWorkspace,
} from "./provisioning.controller.js";

export const provisioningRouter = Router();

provisioningRouter.post("/workspaces", requestWorkspace);
provisioningRouter.get("/workspaces", listWorkspaces);
provisioningRouter.get("/workspaces/:id", getWorkspace);
provisioningRouter.post("/workspaces/:id/destroy", destroyWorkspace);


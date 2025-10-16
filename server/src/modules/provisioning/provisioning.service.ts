import { randomUUID } from "crypto";
import { StatusCodes } from "http-status-codes";

import type { CreateWorkspaceInput } from "./provisioning.schemas.js";

type HttpError = Error & { statusCode?: number };

type WorkspaceStatus = "queued" | "running" | "completed" | "failed" | "destroyed";

type WorkspaceJob = {
  id: string;
  subscriptionId: string;
  stack: "bahmni" | "erpnext" | "bundle";
  region: string;
  domain: string;
  status: WorkspaceStatus;
  terraformStatePath: string | null;
  createdAt: string;
  updatedAt: string;
};

const workspaces = new Map<string, WorkspaceJob>();

export class ProvisioningService {
  async requestWorkspace(payload: CreateWorkspaceInput) {
    const id = randomUUID();
    const timestamp = new Date().toISOString();

    const job: WorkspaceJob = {
      id,
      subscriptionId: payload.subscriptionId,
      stack: payload.stack,
      region: payload.region,
      domain: payload.domain,
      status: "queued",
      terraformStatePath: null,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    workspaces.set(id, job);

    return {
      jobId: id,
      status: job.status,
      message: "Workspace provisioning queued. Terraform execution pending.",
    };
  }

  async getWorkspace(id: string) {
    const job = workspaces.get(id);
    if (!job) {
      const error: HttpError = new Error("Workspace provisioning job not found.");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return job;
  }

  async listWorkspaces() {
    return Array.from(workspaces.values());
  }

  async destroyWorkspace(id: string) {
    const job = await this.getWorkspace(id);
    if (job.status === "destroyed") {
      return job;
    }

    job.status = "destroyed";
    job.updatedAt = new Date().toISOString();
    workspaces.set(id, job);
    return job;
  }
}


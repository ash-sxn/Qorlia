import { randomUUID } from "crypto";
import { StatusCodes } from "http-status-codes";

import type { CreateSubscriptionInput } from "./subscription.schemas.js";

type HttpError = Error & { statusCode?: number };

type SubscriptionStatus = "trialing" | "active" | "canceled" | "past_due";

type Subscription = {
  id: string;
  planId: string;
  status: SubscriptionStatus;
  customerEmail: string;
  customerName: string;
  workspaceName: string;
  createdAt: string;
  updatedAt: string;
};

const plans = [
  {
    id: "bahmni-managed",
    name: "Bahmni Managed",
    description: "Managed Bahmni environment with localisation and support.",
    currency: "INR",
    price: 32000,
    interval: "month",
  },
  {
    id: "erpnext-managed",
    name: "ERPNext Managed",
    description: "Managed ERPNext environment with customisation support.",
    currency: "INR",
    price: 28000,
    interval: "month",
  },
  {
    id: "full-suite",
    name: "Full Suite Bundle",
    description: "Bahmni + ERPNext stack with shared data integrations.",
    currency: "INR",
    price: 54000,
    interval: "month",
  },
];

const subscriptions = new Map<string, Subscription>();

export class SubscriptionService {
  listPlans() {
    return plans;
  }

  async createSubscription(payload: CreateSubscriptionInput) {
    const plan = plans.find((candidate) => candidate.id === payload.planId);
    if (!plan) {
      const error: HttpError = new Error("Selected plan is not available.");
      error.statusCode = StatusCodes.BAD_REQUEST;
      throw error;
    }

    const id = randomUUID();
    const timestamp = new Date().toISOString();
    const record: Subscription = {
      id,
      planId: plan.id,
      status: "trialing",
      customerEmail: payload.customerEmail,
      customerName: payload.customerName,
      workspaceName: payload.workspaceName,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    subscriptions.set(id, record);

    return {
      subscription: record,
      paymentUrl: "https://payments.qorlia.com/demo-checkout",
      message: "Subscription created. Complete payment to activate.",
    };
  }

  async getSubscription(id: string) {
    const subscription = subscriptions.get(id);
    if (!subscription) {
      const error: HttpError = new Error("Subscription not found.");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return subscription;
  }

  async cancelSubscription(id: string) {
    const subscription = await this.getSubscription(id);
    if (subscription.status === "canceled") {
      return subscription;
    }
    subscription.status = "canceled";
    subscription.updatedAt = new Date().toISOString();
    subscriptions.set(id, subscription);
    return subscription;
  }

  async resumeSubscription(id: string) {
    const subscription = await this.getSubscription(id);
    if (subscription.status !== "canceled") {
      const error: HttpError = new Error("Only canceled subscriptions can be resumed.");
      error.statusCode = StatusCodes.BAD_REQUEST;
      throw error;
    }
    subscription.status = "active";
    subscription.updatedAt = new Date().toISOString();
    subscriptions.set(id, subscription);
    return subscription;
  }
}


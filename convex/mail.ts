import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { folder: v.optional(v.string()) },
  handler: async ({ db, auth }, args) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    // Always return empty array - no mail functionality for now
    return [];
  }
});

export const get = query({
  args: { id: v.id("mail") },
  handler: async ({ db, auth }, { id }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    // Return null - no mail functionality for now
    return null;
  }
});

export const send = mutation({
  args: {
    to: v.string(),
    subject: v.string(),
    body: v.string(),
    isDraft: v.optional(v.boolean())
  },
  handler: async ({ db, auth }, { to, subject, body, isDraft = false }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    throw new Error("Mail functionality temporarily disabled");
  }
});

export const saveDraft = mutation({
  args: {
    id: v.optional(v.id("mail")),
    to: v.string(),
    subject: v.string(),
    body: v.string()
  },
  handler: async ({ db, auth }, { id, to, subject, body }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    throw new Error("Mail functionality temporarily disabled");
  }
});

export const deleteMail = mutation({
  args: { id: v.id("mail") },
  handler: async ({ db, auth }, { id }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    throw new Error("Mail functionality temporarily disabled");
  }
});

export const restoreMail = mutation({
  args: { id: v.id("mail") },
  handler: async ({ db, auth }, { id }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    throw new Error("Mail functionality temporarily disabled");
  }
});

export const markAsRead = mutation({
  args: { id: v.id("mail") },
  handler: async ({ db, auth }, { id }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    throw new Error("Mail functionality temporarily disabled");
  }
});

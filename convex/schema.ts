import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  mail: defineTable({
    from: v.string(),
    to: v.string(),
    subject: v.string(),
    body: v.string(),
    date: v.string(),
    isDraft: v.optional(v.boolean()),
    isDeleted: v.optional(v.boolean()),
    isRead: v.optional(v.boolean()),
    folder: v.optional(v.string()),
    userId: v.string()
  }),
  users: defineTable({
    username: v.string(),
    domain: v.string(),
    displayName: v.optional(v.string()),
    bio: v.optional(v.string()),
    userId: v.string(),
    email: v.string()
  })
  .index("by_username_domain", ["username", "domain"])
  .index("by_user_id", ["userId"])
});

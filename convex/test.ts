import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Test functions that don't require authentication
export const listMailsTest = query({
  args: { folder: v.optional(v.string()) },
  handler: async ({ db }, args) => {
    // Return all mails without auth check for testing
    let q = db.query("mail").order("desc");
    
    if (args.folder) {
      switch (args.folder) {
        case "inbox":
          q = q.filter(q => q.eq(q.field("isDeleted"), false));
          break;
        case "sent":
          q = q.filter(q => q.eq(q.field("isDraft"), false))
               .filter(q => q.eq(q.field("isDeleted"), false));
          break;
        case "drafts":
          q = q.filter(q => q.eq(q.field("isDraft"), true))
               .filter(q => q.eq(q.field("isDeleted"), false));
          break;
        case "deleted":
          q = q.filter(q => q.eq(q.field("isDeleted"), true));
          break;
      }
    } else {
      q = q.filter(q => q.eq(q.field("isDeleted"), false));
    }
    
    return await q.collect();
  }
});

export const listUsersTest = query(async ({ db }) => {
  // Return all users without auth check for testing
  return await db.query("users").collect();
});

export const sendTestMail = mutation({
  args: {
    from: v.string(),
    to: v.string(),
    subject: v.string(),
    body: v.string()
  },
  handler: async ({ db }, { from, to, subject, body }) => {
    // Create test mail without auth
    return await db.insert("mail", {
      from,
      to,
      subject,
      body,
      date: new Date().toISOString(),
      userId: "test-user",
      isDraft: false,
      isDeleted: false
    });
  }
});

export const createTestUser = mutation({
  args: {
    username: v.string(),
    domain: v.string(),
    displayName: v.optional(v.string()),
  },
  handler: async ({ db }, args) => {
    const { username, domain, displayName } = args;
    
    // Check if user already exists
    const existing = await db
      .query("users")
      .withIndex("by_username_domain", q => q.eq("username", username).eq("domain", domain))
      .unique();
      
    if (existing) throw new Error("Username@domain already exists");
    
    return await db.insert("users", { 
      username, 
      domain, 
      displayName: displayName || `${username}@${domain}`, 
      bio: "Test user",
      userId: "test-user",
      email: `${username}@${domain}`
    });
  },
});
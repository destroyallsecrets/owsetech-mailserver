import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    username: v.string(),
    domain: v.string(),
    displayName: v.optional(v.string()),
    bio: v.optional(v.string()),
  },
  handler: async ({ db, auth }, args) => {
    const { username, domain, displayName, bio } = args;
    
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const userId = identity.subject;
    const email = identity.email;
    
    if (!email) throw new Error("No email associated with user");
    
    // Ensure unique username@domain
    const existing = await db
      .query("users")
      .withIndex("by_username_domain", (q) => q.eq("username", username).eq("domain", domain))
      .unique();
      
    if (existing) throw new Error("Username@domain already exists");
    
    const existingUser = await db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .unique();
      
    if (existingUser) throw new Error("User already exists");
    
    return await db.insert("users", { 
      username, 
      domain, 
      displayName, 
      bio,
      userId,
      email
    });
  },
});

export const getByAddress = query({
  args: { username: v.string(), domain: v.string() },
  handler: async ({ db, auth }, args) => {
    const { username, domain } = args;
    
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    return await db
      .query("users")
      .withIndex("by_username_domain", (q) => q.eq("username", username).eq("domain", domain))
      .unique();
  },
});

export const list = query(async ({ db, auth }) => {
  const identity = await auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");
  
  return await db.query("users").collect();
});

export const getCurrentUser = query(async ({ db, auth }) => {
  const identity = await auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");
  
  return await db
    .query("users")
    .filter((q) => q.eq(q.field("userId"), identity.subject))
    .unique();
});

export const searchUsers = query({
  args: { query: v.string() },
  handler: async ({ db, auth }, { query }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const users = await db.query("users").collect();
    
    if (!query) return users;
    
    return users.filter(user => 
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.domain.toLowerCase().includes(query.toLowerCase()) ||
      (user.displayName && user.displayName.toLowerCase().includes(query.toLowerCase()))
    );
  }
});

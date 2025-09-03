import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { folder: v.optional(v.string()) },
  handler: async ({ db, auth }, args) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const userId = identity.subject;

    // Get user's registered username@domain
    const user = await db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .unique();

    if (!user) {
      // Return empty array for unregistered users instead of throwing error
      return [];
    }

    const userAddress = `${user.username}@${user.domain}`;

    let mailQuery = db.query("mail").order("desc");

    if (args.folder) {
      switch (args.folder) {
        case "inbox":
          mailQuery = mailQuery
            .filter((q) => q.eq(q.field("to"), userAddress))
            .filter((q) => q.eq(q.field("isDeleted"), false))
            .filter((q) => q.eq(q.field("isDraft"), false));
          break;
        case "sent":
          mailQuery = mailQuery
            .filter((q) => q.eq(q.field("from"), userAddress))
            .filter((q) => q.eq(q.field("isDraft"), false))
            .filter((q) => q.eq(q.field("isDeleted"), false));
          break;
        case "drafts":
          mailQuery = mailQuery
            .filter((q) => q.eq(q.field("from"), userAddress))
            .filter((q) => q.eq(q.field("isDraft"), true))
            .filter((q) => q.eq(q.field("isDeleted"), false));
          break;
        case "deleted":
          mailQuery = mailQuery
            .filter((q) => q.or(
              q.eq(q.field("to"), userAddress),
              q.eq(q.field("from"), userAddress)
            ))
            .filter((q) => q.eq(q.field("isDeleted"), true));
          break;
      }
    } else {
      // Default to inbox view
      mailQuery = mailQuery
        .filter((q) => q.eq(q.field("to"), userAddress))
        .filter((q) => q.eq(q.field("isDeleted"), false))
        .filter((q) => q.eq(q.field("isDraft"), false));
    }

    return await mailQuery.collect();
  }
});

export const get = query({
  args: { id: v.id("mail") },
  handler: async ({ db, auth }, { id }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const mail = await db.get(id);
    if (!mail) throw new Error("Mail not found");

    // Get user's registered username@domain
    const user = await db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .unique();

    if (!user) {
      // Return null for unregistered users instead of throwing error
      return null;
    }

    const userAddress = `${user.username}@${user.domain}`;

    // Check if user has access to this mail
    if (mail.to !== userAddress && mail.from !== userAddress) {
      throw new Error("Unauthorized");
    }

    return mail;
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
    const userId = identity.subject;

    // Get user's registered username@domain
    const user = await db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .unique();

    if (!user) throw new Error("Please register an email address first");

    const fromAddress = `${user.username}@${user.domain}`;

    // Validate recipient exists if not a draft
    if (!isDraft) {
      const [toUsername, toDomain] = to.split("@");
      const recipient = await db
        .query("users")
        .withIndex("by_username_domain", (q) => q.eq("username", toUsername).eq("domain", toDomain))
        .unique();

      if (!recipient) throw new Error("Recipient not found");
    }

    return await db.insert("mail", {
      from: fromAddress,
      to,
      subject,
      body,
      date: new Date().toISOString(),
      userId,
      isDraft,
      isDeleted: false,
      isRead: false
    });
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
    const userId = identity.subject;

    // Get user's registered username@domain
    const user = await db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .unique();

    if (!user) throw new Error("Please register an email address first");

    const fromAddress = `${user.username}@${user.domain}`;

    if (id) {
      // Update existing draft
      const draft = await db.get(id);
      if (!draft || draft.from !== fromAddress || !draft.isDraft) {
        throw new Error("Draft not found or unauthorized");
      }

      await db.patch(id, { to, subject, body });
      return id;
    } else {
      // Create new draft
      return await db.insert("mail", {
        from: fromAddress,
        to,
        subject,
        body,
        date: new Date().toISOString(),
        userId,
        isDraft: true,
        isDeleted: false,
        isRead: false
      });
    }
  }
});

export const deleteMail = mutation({
  args: { id: v.id("mail") },
  handler: async ({ db, auth }, { id }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const mail = await db.get(id);
    if (!mail) throw new Error("Mail not found");

    // Get user's registered username@domain
    const user = await db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .unique();

    if (!user) throw new Error("Please register an email address first");

    const userAddress = `${user.username}@${user.domain}`;

    // Check if user has access to this mail
    if (mail.to !== userAddress && mail.from !== userAddress) {
      throw new Error("Unauthorized");
    }

    await db.patch(id, { isDeleted: true });
  }
});

export const restoreMail = mutation({
  args: { id: v.id("mail") },
  handler: async ({ db, auth }, { id }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const mail = await db.get(id);
    if (!mail) throw new Error("Mail not found");

    // Get user's registered username@domain
    const user = await db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .unique();

    if (!user) throw new Error("Please register an email address first");

    const userAddress = `${user.username}@${user.domain}`;

    // Check if user has access to this mail
    if (mail.to !== userAddress && mail.from !== userAddress) {
      throw new Error("Unauthorized");
    }

    await db.patch(id, { isDeleted: false });
  }
});

export const markAsRead = mutation({
  args: { id: v.id("mail") },
  handler: async ({ db, auth }, { id }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const mail = await db.get(id);
    if (!mail) throw new Error("Mail not found");

    // Get user's registered username@domain
    const user = await db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .unique();

    if (!user) throw new Error("Please register an email address first");

    const userAddress = `${user.username}@${user.domain}`;

    // Only the recipient can mark as read
    if (mail.to !== userAddress) {
      throw new Error("Unauthorized");
    }

    await db.patch(id, { isRead: true });
  }
});

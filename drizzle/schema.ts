import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "owner", "manager", "staff"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Businesses table - stores local business information
 */
export const businesses = mysqlTable("businesses", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  businessType: mysqlEnum("businessType", ["barbershop", "salon", "spa", "restaurant", "gym", "other"]).notNull(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 320 }),
  address: text("address"),
  timezone: varchar("timezone", { length: 64 }).default("America/Mexico_City").notNull(),
  gmbConnected: boolean("gmbConnected").default(false).notNull(),
  gmbPlaceId: varchar("gmbPlaceId", { length: 255 }),
  gmbAccessToken: text("gmbAccessToken"),
  gmbRefreshToken: text("gmbRefreshToken"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Business = typeof businesses.$inferSelect;
export type InsertBusiness = typeof businesses.$inferInsert;

/**
 * Business hours configuration
 */
export const businessHours = mysqlTable("businessHours", {
  id: int("id").autoincrement().primaryKey(),
  businessId: int("businessId").notNull(),
  dayOfWeek: int("dayOfWeek").notNull(), // 0 = Sunday, 6 = Saturday
  openTime: varchar("openTime", { length: 5 }), // HH:MM format
  closeTime: varchar("closeTime", { length: 5 }), // HH:MM format
  isClosed: boolean("isClosed").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BusinessHour = typeof businessHours.$inferSelect;
export type InsertBusinessHour = typeof businessHours.$inferInsert;

/**
 * Contacts/Customers table
 */
export const contacts = mysqlTable("contacts", {
  id: int("id").autoincrement().primaryKey(),
  businessId: int("businessId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 320 }),
  preferredLanguage: mysqlEnum("preferredLanguage", ["es", "en"]).default("es").notNull(),
  optedInSms: boolean("optedInSms").default(false).notNull(),
  optedInWhatsapp: boolean("optedInWhatsapp").default(false).notNull(),
  optedInEmail: boolean("optedInEmail").default(false).notNull(),
  tags: text("tags"), // JSON array of tags
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastVisitAt: timestamp("lastVisitAt"),
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

/**
 * Visits table - tracks customer visits
 */
export const visits = mysqlTable("visits", {
  id: int("id").autoincrement().primaryKey(),
  businessId: int("businessId").notNull(),
  contactId: int("contactId").notNull(),
  visitDate: timestamp("visitDate").notNull(),
  service: varchar("service", { length: 255 }),
  amount: int("amount"), // Amount in cents
  staffMember: varchar("staffMember", { length: 255 }),
  notes: text("notes"),
  satisfactionScore: int("satisfactionScore"), // 1-5 scale
  reviewRequested: boolean("reviewRequested").default(false).notNull(),
  reviewRequestedAt: timestamp("reviewRequestedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Visit = typeof visits.$inferSelect;
export type InsertVisit = typeof visits.$inferInsert;

/**
 * Reviews table - tracks online reviews
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  businessId: int("businessId").notNull(),
  contactId: int("contactId"),
  visitId: int("visitId"),
  platform: mysqlEnum("platform", ["google", "facebook", "yelp", "other"]).notNull(),
  rating: int("rating").notNull(), // 1-5 scale
  reviewText: text("reviewText"),
  reviewerName: varchar("reviewerName", { length: 255 }),
  reviewUrl: text("reviewUrl"),
  responded: boolean("responded").default(false).notNull(),
  responseText: text("responseText"),
  respondedAt: timestamp("respondedAt"),
  reviewDate: timestamp("reviewDate").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Referrals table - tracks referral program
 */
export const referrals = mysqlTable("referrals", {
  id: int("id").autoincrement().primaryKey(),
  businessId: int("businessId").notNull(),
  referrerId: int("referrerId").notNull(), // Contact who referred
  referredId: int("referredId"), // Contact who was referred
  referralCode: varchar("referralCode", { length: 32 }).notNull().unique(),
  qrCodeUrl: text("qrCodeUrl"),
  status: mysqlEnum("status", ["pending", "redeemed", "expired"]).default("pending").notNull(),
  rewardType: varchar("rewardType", { length: 64 }),
  rewardValue: int("rewardValue"), // Amount in cents or percentage
  redeemedAt: timestamp("redeemedAt"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Referral = typeof referrals.$inferSelect;
export type InsertReferral = typeof referrals.$inferInsert;

/**
 * Campaigns table - marketing campaigns
 */
export const campaigns = mysqlTable("campaigns", {
  id: int("id").autoincrement().primaryKey(),
  businessId: int("businessId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["review_request", "reactivation", "smart_filler", "referral", "custom"]).notNull(),
  status: mysqlEnum("status", ["draft", "scheduled", "active", "paused", "completed"]).default("draft").notNull(),
  channel: mysqlEnum("channel", ["sms", "whatsapp", "email", "push"]).notNull(),
  messageTemplate: text("messageTemplate").notNull(),
  targetAudience: text("targetAudience"), // JSON criteria
  scheduledAt: timestamp("scheduledAt"),
  completedAt: timestamp("completedAt"),
  totalSent: int("totalSent").default(0).notNull(),
  totalOpened: int("totalOpened").default(0).notNull(),
  totalClicked: int("totalClicked").default(0).notNull(),
  totalConverted: int("totalConverted").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = typeof campaigns.$inferInsert;

/**
 * Messages table - individual messages sent
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  businessId: int("businessId").notNull(),
  contactId: int("contactId").notNull(),
  campaignId: int("campaignId"),
  channel: mysqlEnum("channel", ["sms", "whatsapp", "email", "push"]).notNull(),
  messageType: varchar("messageType", { length: 64 }),
  content: text("content").notNull(),
  status: mysqlEnum("status", ["pending", "sent", "delivered", "failed", "opened", "clicked"]).default("pending").notNull(),
  externalId: varchar("externalId", { length: 255 }), // Twilio/SendGrid message ID
  errorMessage: text("errorMessage"),
  sentAt: timestamp("sentAt"),
  deliveredAt: timestamp("deliveredAt"),
  openedAt: timestamp("openedAt"),
  clickedAt: timestamp("clickedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * Events table - system events and triggers
 */
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  businessId: int("businessId").notNull(),
  eventType: varchar("eventType", { length: 64 }).notNull(),
  entityType: varchar("entityType", { length: 64 }), // visit, review, referral, etc.
  entityId: int("entityId"),
  payload: text("payload"), // JSON data
  processed: boolean("processed").default(false).notNull(),
  processedAt: timestamp("processedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

/**
 * API Keys table - for external integrations
 */
export const apiKeys = mysqlTable("apiKeys", {
  id: int("id").autoincrement().primaryKey(),
  businessId: int("businessId").notNull(),
  keyName: varchar("keyName", { length: 255 }).notNull(),
  keyValue: varchar("keyValue", { length: 255 }).notNull().unique(),
  service: varchar("service", { length: 64 }), // twilio, stripe, sendgrid, etc.
  isActive: boolean("isActive").default(true).notNull(),
  lastUsedAt: timestamp("lastUsedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ApiKey = typeof apiKeys.$inferSelect;
export type InsertApiKey = typeof apiKeys.$inferInsert;

/**
 * Message Templates table - reusable message templates
 */
export const messageTemplates = mysqlTable("messageTemplates", {
  id: int("id").autoincrement().primaryKey(),
  businessId: int("businessId"),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["review_request", "satisfaction_check", "reactivation", "referral", "negative_review_response", "custom"]).notNull(),
  language: mysqlEnum("language", ["es", "en"]).default("es").notNull(),
  channel: mysqlEnum("channel", ["sms", "whatsapp", "email", "push"]).notNull(),
  subject: varchar("subject", { length: 255 }), // For emails
  content: text("content").notNull(),
  variables: text("variables"), // JSON array of variable names
  isDefault: boolean("isDefault").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MessageTemplate = typeof messageTemplates.$inferSelect;
export type InsertMessageTemplate = typeof messageTemplates.$inferInsert;

/**
 * Automation Flows table - defines automation sequences
 */
export const automationFlows = mysqlTable("automationFlows", {
  id: int("id").autoincrement().primaryKey(),
  businessId: int("businessId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  flowType: mysqlEnum("flowType", ["review_request", "satisfaction_check", "smart_filler", "referral_onboarding", "reactivation"]).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  triggerEvent: varchar("triggerEvent", { length: 64 }).notNull(),
  conditions: text("conditions"), // JSON conditions
  steps: text("steps").notNull(), // JSON array of steps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AutomationFlow = typeof automationFlows.$inferSelect;
export type InsertAutomationFlow = typeof automationFlows.$inferInsert;

/**
 * Slow Slots Detection table - tracks low-occupancy periods
 */
export const slowSlots = mysqlTable("slowSlots", {
  id: int("id").autoincrement().primaryKey(),
  businessId: int("businessId").notNull(),
  dayOfWeek: int("dayOfWeek").notNull(),
  hourStart: int("hourStart").notNull(), // 0-23
  hourEnd: int("hourEnd").notNull(), // 0-23
  avgOccupancy: int("avgOccupancy").default(0).notNull(), // Percentage
  lastDetectedAt: timestamp("lastDetectedAt").notNull(),
  promoActive: boolean("promoActive").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SlowSlot = typeof slowSlots.$inferSelect;
export type InsertSlowSlot = typeof slowSlots.$inferInsert;

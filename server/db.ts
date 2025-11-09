import { eq, and, desc, sql, gte, lte, isNull } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users,
  businesses, InsertBusiness,
  contacts, InsertContact,
  visits, InsertVisit,
  reviews, InsertReview,
  referrals, InsertReferral,
  campaigns, InsertCampaign,
  messages, InsertMessage,
  events, InsertEvent,
  messageTemplates, InsertMessageTemplate,
  automationFlows, InsertAutomationFlow,
  businessHours, InsertBusinessHour,
  slowSlots, InsertSlowSlot
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ========== BUSINESSES ==========

export async function createBusiness(data: InsertBusiness) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(businesses).values(data);
  return result;
}

export async function getBusinessById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(businesses).where(eq(businesses.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getBusinessesByOwnerId(ownerId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(businesses).where(eq(businesses.ownerId, ownerId));
}

export async function updateBusiness(id: number, data: Partial<InsertBusiness>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(businesses).set(data).where(eq(businesses.id, id));
}

// ========== CONTACTS ==========

export async function createContact(data: InsertContact) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(contacts).values(data);
  return result;
}

export async function getContactsByBusinessId(businessId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(contacts).where(eq(contacts.businessId, businessId)).orderBy(desc(contacts.createdAt));
}

export async function getContactById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(contacts).where(eq(contacts.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateContact(id: number, data: Partial<InsertContact>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(contacts).set(data).where(eq(contacts.id, id));
}

export async function getInactiveContacts(businessId: number, daysInactive: number) {
  const db = await getDb();
  if (!db) return [];
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysInactive);
  
  return await db.select().from(contacts)
    .where(
      and(
        eq(contacts.businessId, businessId),
        lte(contacts.lastVisitAt, cutoffDate)
      )
    )
    .orderBy(contacts.lastVisitAt);
}

// ========== VISITS ==========

export async function createVisit(data: InsertVisit) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(visits).values(data);
  
  // Update contact's lastVisitAt
  if (data.contactId) {
    await db.update(contacts)
      .set({ lastVisitAt: data.visitDate })
      .where(eq(contacts.id, data.contactId));
  }
  
  return result;
}

export async function getVisitsByBusinessId(businessId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(visits)
    .where(eq(visits.businessId, businessId))
    .orderBy(desc(visits.visitDate))
    .limit(limit);
}

export async function getVisitsByContactId(contactId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(visits)
    .where(eq(visits.contactId, contactId))
    .orderBy(desc(visits.visitDate));
}

export async function updateVisit(id: number, data: Partial<InsertVisit>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(visits).set(data).where(eq(visits.id, id));
}

// ========== REVIEWS ==========

export async function createReview(data: InsertReview) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(reviews).values(data);
}

export async function getReviewsByBusinessId(businessId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(reviews)
    .where(eq(reviews.businessId, businessId))
    .orderBy(desc(reviews.reviewDate))
    .limit(limit);
}

export async function getRecentReviews(businessId: number, days: number = 30) {
  const db = await getDb();
  if (!db) return [];
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return await db.select().from(reviews)
    .where(
      and(
        eq(reviews.businessId, businessId),
        gte(reviews.reviewDate, cutoffDate)
      )
    )
    .orderBy(desc(reviews.reviewDate));
}

export async function updateReview(id: number, data: Partial<InsertReview>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(reviews).set(data).where(eq(reviews.id, id));
}

// ========== REFERRALS ==========

export async function createReferral(data: InsertReferral) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(referrals).values(data);
}

export async function getReferralsByBusinessId(businessId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(referrals)
    .where(eq(referrals.businessId, businessId))
    .orderBy(desc(referrals.createdAt));
}

export async function getReferralByCode(code: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(referrals)
    .where(eq(referrals.referralCode, code))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateReferral(id: number, data: Partial<InsertReferral>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(referrals).set(data).where(eq(referrals.id, id));
}

export async function getTopReferrers(businessId: number, limit: number = 10) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select({
    referrerId: referrals.referrerId,
    count: sql<number>`count(*)`.as('count')
  })
  .from(referrals)
  .where(
    and(
      eq(referrals.businessId, businessId),
      eq(referrals.status, 'redeemed')
    )
  )
  .groupBy(referrals.referrerId)
  .orderBy(desc(sql`count(*)`))
  .limit(limit);
}

// ========== CAMPAIGNS ==========

export async function createCampaign(data: InsertCampaign) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(campaigns).values(data);
}

export async function getCampaignsByBusinessId(businessId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(campaigns)
    .where(eq(campaigns.businessId, businessId))
    .orderBy(desc(campaigns.createdAt));
}

export async function updateCampaign(id: number, data: Partial<InsertCampaign>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(campaigns).set(data).where(eq(campaigns.id, id));
}

// ========== MESSAGES ==========

export async function createMessage(data: InsertMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(messages).values(data);
}

export async function getMessagesByBusinessId(businessId: number, limit: number = 100) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(messages)
    .where(eq(messages.businessId, businessId))
    .orderBy(desc(messages.createdAt))
    .limit(limit);
}

export async function updateMessage(id: number, data: Partial<InsertMessage>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(messages).set(data).where(eq(messages.id, id));
}

// ========== MESSAGE TEMPLATES ==========

export async function createMessageTemplate(data: InsertMessageTemplate) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(messageTemplates).values(data);
}

export async function getMessageTemplatesByBusinessId(businessId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(messageTemplates)
    .where(eq(messageTemplates.businessId, businessId))
    .orderBy(messageTemplates.type, messageTemplates.language);
}

export async function getDefaultTemplates() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(messageTemplates)
    .where(
      and(
        isNull(messageTemplates.businessId),
        eq(messageTemplates.isDefault, true)
      )
    );
}

// ========== EVENTS ==========

export async function createEvent(data: InsertEvent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(events).values(data);
}

export async function getUnprocessedEvents(businessId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(events)
    .where(
      and(
        eq(events.businessId, businessId),
        eq(events.processed, false)
      )
    )
    .orderBy(events.createdAt);
}

export async function markEventProcessed(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(events)
    .set({ processed: true, processedAt: new Date() })
    .where(eq(events.id, id));
}

// ========== AUTOMATION FLOWS ==========

export async function createAutomationFlow(data: InsertAutomationFlow) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(automationFlows).values(data);
}

export async function getAutomationFlowsByBusinessId(businessId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(automationFlows)
    .where(eq(automationFlows.businessId, businessId));
}

export async function getActiveFlowsByType(businessId: number, flowType: string) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(automationFlows)
    .where(
      and(
        eq(automationFlows.businessId, businessId),
        eq(automationFlows.flowType, flowType as any),
        eq(automationFlows.isActive, true)
      )
    );
}

// ========== BUSINESS HOURS ==========

export async function createBusinessHours(data: InsertBusinessHour) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(businessHours).values(data);
}

export async function getBusinessHoursByBusinessId(businessId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(businessHours)
    .where(eq(businessHours.businessId, businessId))
    .orderBy(businessHours.dayOfWeek);
}

// ========== SLOW SLOTS ==========

export async function createSlowSlot(data: InsertSlowSlot) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(slowSlots).values(data);
}

export async function getSlowSlotsByBusinessId(businessId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(slowSlots)
    .where(eq(slowSlots.businessId, businessId))
    .orderBy(slowSlots.dayOfWeek, slowSlots.hourStart);
}

// ========== DASHBOARD METRICS ==========

export async function getDashboardMetrics(businessId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  // Visits this week
  const visitsThisWeek = await db.select({ count: sql<number>`count(*)` })
    .from(visits)
    .where(
      and(
        eq(visits.businessId, businessId),
        gte(visits.visitDate, sevenDaysAgo)
      )
    );
  
  // Reviews last 30 days
  const reviewsLast30Days = await db.select({ count: sql<number>`count(*)`, avgRating: sql<number>`avg(rating)` })
    .from(reviews)
    .where(
      and(
        eq(reviews.businessId, businessId),
        gte(reviews.reviewDate, thirtyDaysAgo)
      )
    );
  
  // Average ticket
  const avgTicket = await db.select({ avg: sql<number>`avg(amount)` })
    .from(visits)
    .where(
      and(
        eq(visits.businessId, businessId),
        gte(visits.visitDate, thirtyDaysAgo)
      )
    );
  
  // Repeat rate (customers with 2+ visits in last 60 days)
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
  const repeatCustomers = await db.select({
    contactId: visits.contactId,
    count: sql<number>`count(*)`
  })
  .from(visits)
  .where(
    and(
      eq(visits.businessId, businessId),
      gte(visits.visitDate, sixtyDaysAgo)
    )
  )
  .groupBy(visits.contactId)
  .having(sql`count(*) >= 2`);
  
  return {
    visitsThisWeek: visitsThisWeek[0]?.count || 0,
    reviewsLast30Days: reviewsLast30Days[0]?.count || 0,
    avgRating: reviewsLast30Days[0]?.avgRating || 0,
    avgTicket: avgTicket[0]?.avg || 0,
    repeatRate: repeatCustomers.length
  };
}

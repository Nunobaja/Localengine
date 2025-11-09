import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ========== BUSINESSES ==========
  businesses: router({
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        businessType: z.enum(["barbershop", "salon", "spa", "restaurant", "gym", "other"]),
        phone: z.string().optional(),
        email: z.string().optional(),
        address: z.string().optional(),
        timezone: z.string().default("America/Mexico_City"),
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await db.createBusiness({
          ...input,
          ownerId: ctx.user.id,
        });
        return { success: true, id: result[0].insertId };
      }),

    list: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getBusinessesByOwnerId(ctx.user.id);
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getBusinessById(input.id);
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        address: z.string().optional(),
        timezone: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateBusiness(id, data);
        return { success: true };
      }),

    getDashboard: protectedProcedure
      .input(z.object({ businessId: z.number() }))
      .query(async ({ input }) => {
        return await db.getDashboardMetrics(input.businessId);
      }),
  }),

  // ========== CONTACTS ==========
  contacts: router({
    create: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        name: z.string(),
        phone: z.string().optional(),
        email: z.string().optional(),
        preferredLanguage: z.enum(["es", "en"]).default("es"),
        optedInSms: z.boolean().default(false),
        optedInWhatsapp: z.boolean().default(false),
        optedInEmail: z.boolean().default(false),
        tags: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await db.createContact(input);
        return { success: true, id: result[0].insertId };
      }),

    list: protectedProcedure
      .input(z.object({ businessId: z.number() }))
      .query(async ({ input }) => {
        return await db.getContactsByBusinessId(input.businessId);
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getContactById(input.id);
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        preferredLanguage: z.enum(["es", "en"]).optional(),
        optedInSms: z.boolean().optional(),
        optedInWhatsapp: z.boolean().optional(),
        optedInEmail: z.boolean().optional(),
        tags: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateContact(id, data);
        return { success: true };
      }),

    getInactive: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        daysInactive: z.number().default(90),
      }))
      .query(async ({ input }) => {
        return await db.getInactiveContacts(input.businessId, input.daysInactive);
      }),
  }),

  // ========== VISITS ==========
  visits: router({
    create: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        contactId: z.number(),
        visitDate: z.date(),
        service: z.string().optional(),
        amount: z.number().optional(),
        staffMember: z.string().optional(),
        notes: z.string().optional(),
        satisfactionScore: z.number().min(1).max(5).optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await db.createVisit(input);
        
        // Create event for automation flows
        await db.createEvent({
          businessId: input.businessId,
          eventType: 'visit.completed',
          entityType: 'visit',
          entityId: result[0].insertId,
          payload: JSON.stringify(input),
        });
        
        return { success: true, id: result[0].insertId };
      }),

    list: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        limit: z.number().default(50),
      }))
      .query(async ({ input }) => {
        return await db.getVisitsByBusinessId(input.businessId, input.limit);
      }),

    getByContact: protectedProcedure
      .input(z.object({ contactId: z.number() }))
      .query(async ({ input }) => {
        return await db.getVisitsByContactId(input.contactId);
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        service: z.string().optional(),
        amount: z.number().optional(),
        staffMember: z.string().optional(),
        notes: z.string().optional(),
        satisfactionScore: z.number().min(1).max(5).optional(),
        reviewRequested: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateVisit(id, data);
        return { success: true };
      }),
  }),

  // ========== REVIEWS ==========
  reviews: router({
    create: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        contactId: z.number().optional(),
        visitId: z.number().optional(),
        platform: z.enum(["google", "facebook", "yelp", "other"]),
        rating: z.number().min(1).max(5),
        reviewText: z.string().optional(),
        reviewerName: z.string().optional(),
        reviewUrl: z.string().optional(),
        reviewDate: z.date(),
      }))
      .mutation(async ({ input }) => {
        const result = await db.createReview(input);
        
        // Create event for automation flows
        await db.createEvent({
          businessId: input.businessId,
          eventType: 'review.received',
          entityType: 'review',
          entityId: result[0].insertId,
          payload: JSON.stringify(input),
        });
        
        return { success: true, id: result[0].insertId };
      }),

    list: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        limit: z.number().default(50),
      }))
      .query(async ({ input }) => {
        return await db.getReviewsByBusinessId(input.businessId, input.limit);
      }),

    getRecent: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        days: z.number().default(30),
      }))
      .query(async ({ input }) => {
        return await db.getRecentReviews(input.businessId, input.days);
      }),

    respond: protectedProcedure
      .input(z.object({
        id: z.number(),
        responseText: z.string(),
      }))
      .mutation(async ({ input }) => {
        await db.updateReview(input.id, {
          responded: true,
          responseText: input.responseText,
          respondedAt: new Date(),
        });
        return { success: true };
      }),
  }),

  // ========== REFERRALS ==========
  referrals: router({
    create: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        referrerId: z.number(),
        rewardType: z.string().optional(),
        rewardValue: z.number().optional(),
        expiresAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        // Generate unique referral code
        const code = `REF${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        
        const result = await db.createReferral({
          ...input,
          referralCode: code,
        });
        
        return { success: true, id: result[0].insertId, code };
      }),

    list: protectedProcedure
      .input(z.object({ businessId: z.number() }))
      .query(async ({ input }) => {
        return await db.getReferralsByBusinessId(input.businessId);
      }),

    redeem: protectedProcedure
      .input(z.object({
        code: z.string(),
        referredId: z.number(),
      }))
      .mutation(async ({ input }) => {
        const referral = await db.getReferralByCode(input.code);
        
        if (!referral) {
          throw new Error("Referral code not found");
        }
        
        if (referral.status !== 'pending') {
          throw new Error("Referral code already used or expired");
        }
        
        await db.updateReferral(referral.id, {
          referredId: input.referredId,
          status: 'redeemed',
          redeemedAt: new Date(),
        });
        
        // Create event for automation flows
        await db.createEvent({
          businessId: referral.businessId,
          eventType: 'referral.redeemed',
          entityType: 'referral',
          entityId: referral.id,
          payload: JSON.stringify({ ...referral, referredId: input.referredId }),
        });
        
        return { success: true, referral };
      }),

    getTopReferrers: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        limit: z.number().default(10),
      }))
      .query(async ({ input }) => {
        return await db.getTopReferrers(input.businessId, input.limit);
      }),
  }),

  // ========== CAMPAIGNS ==========
  campaigns: router({
    create: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        name: z.string(),
        type: z.enum(["review_request", "reactivation", "smart_filler", "referral", "custom"]),
        channel: z.enum(["sms", "whatsapp", "email", "push"]),
        messageTemplate: z.string(),
        targetAudience: z.string().optional(),
        scheduledAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await db.createCampaign(input);
        return { success: true, id: result[0].insertId };
      }),

    list: protectedProcedure
      .input(z.object({ businessId: z.number() }))
      .query(async ({ input }) => {
        return await db.getCampaignsByBusinessId(input.businessId);
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        status: z.enum(["draft", "scheduled", "active", "paused", "completed"]).optional(),
        scheduledAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateCampaign(id, data);
        return { success: true };
      }),
  }),

  // ========== MESSAGES ==========
  messages: router({
    create: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        contactId: z.number(),
        campaignId: z.number().optional(),
        channel: z.enum(["sms", "whatsapp", "email", "push"]),
        messageType: z.string().optional(),
        content: z.string(),
      }))
      .mutation(async ({ input }) => {
        const result = await db.createMessage(input);
        return { success: true, id: result[0].insertId };
      }),

    list: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        limit: z.number().default(100),
      }))
      .query(async ({ input }) => {
        return await db.getMessagesByBusinessId(input.businessId, input.limit);
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "sent", "delivered", "failed", "opened", "clicked"]),
        externalId: z.string().optional(),
        errorMessage: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        const updateData: any = { ...data };
        
        if (data.status === 'sent') updateData.sentAt = new Date();
        if (data.status === 'delivered') updateData.deliveredAt = new Date();
        if (data.status === 'opened') updateData.openedAt = new Date();
        if (data.status === 'clicked') updateData.clickedAt = new Date();
        
        await db.updateMessage(id, updateData);
        return { success: true };
      }),
  }),

  // ========== MESSAGE TEMPLATES ==========
  templates: router({
    create: protectedProcedure
      .input(z.object({
        businessId: z.number().optional(),
        name: z.string(),
        type: z.enum(["review_request", "satisfaction_check", "reactivation", "referral", "negative_review_response", "custom"]),
        language: z.enum(["es", "en"]),
        channel: z.enum(["sms", "whatsapp", "email", "push"]),
        subject: z.string().optional(),
        content: z.string(),
        variables: z.string().optional(),
        isDefault: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        const result = await db.createMessageTemplate(input);
        return { success: true, id: result[0].insertId };
      }),

    list: protectedProcedure
      .input(z.object({ businessId: z.number() }))
      .query(async ({ input }) => {
        return await db.getMessageTemplatesByBusinessId(input.businessId);
      }),

    getDefaults: publicProcedure
      .query(async () => {
        return await db.getDefaultTemplates();
      }),
  }),

  // ========== AUTOMATION FLOWS ==========
  automations: router({
    create: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        name: z.string(),
        flowType: z.enum(["review_request", "satisfaction_check", "smart_filler", "referral_onboarding", "reactivation"]),
        isActive: z.boolean().default(true),
        triggerEvent: z.string(),
        conditions: z.string().optional(),
        steps: z.string(),
      }))
      .mutation(async ({ input }) => {
        const result = await db.createAutomationFlow(input);
        return { success: true, id: result[0].insertId };
      }),

    list: protectedProcedure
      .input(z.object({ businessId: z.number() }))
      .query(async ({ input }) => {
        return await db.getAutomationFlowsByBusinessId(input.businessId);
      }),

    getByType: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        flowType: z.string(),
      }))
      .query(async ({ input }) => {
        return await db.getActiveFlowsByType(input.businessId, input.flowType);
      }),
  }),

  // ========== BUSINESS HOURS ==========
  businessHours: router({
    create: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        dayOfWeek: z.number().min(0).max(6),
        openTime: z.string().optional(),
        closeTime: z.string().optional(),
        isClosed: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        const result = await db.createBusinessHours(input);
        return { success: true, id: result[0].insertId };
      }),

    list: protectedProcedure
      .input(z.object({ businessId: z.number() }))
      .query(async ({ input }) => {
        return await db.getBusinessHoursByBusinessId(input.businessId);
      }),
  }),

  // ========== SLOW SLOTS ==========
  slowSlots: router({
    list: protectedProcedure
      .input(z.object({ businessId: z.number() }))
      .query(async ({ input }) => {
        return await db.getSlowSlotsByBusinessId(input.businessId);
      }),

    create: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        dayOfWeek: z.number().min(0).max(6),
        hourStart: z.number().min(0).max(23),
        hourEnd: z.number().min(0).max(23),
        avgOccupancy: z.number().default(0),
        lastDetectedAt: z.date(),
      }))
      .mutation(async ({ input }) => {
        const result = await db.createSlowSlot(input);
        
        // Create event for smart filler automation
        await db.createEvent({
          businessId: input.businessId,
          eventType: 'slot.slow_detected',
          entityType: 'slow_slot',
          entityId: result[0].insertId,
          payload: JSON.stringify(input),
        });
        
        return { success: true, id: result[0].insertId };
      }),
  }),

  // ========== EVENTS ==========
  events: router({
    getUnprocessed: protectedProcedure
      .input(z.object({ businessId: z.number() }))
      .query(async ({ input }) => {
        return await db.getUnprocessedEvents(input.businessId);
      }),

    markProcessed: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.markEventProcessed(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;

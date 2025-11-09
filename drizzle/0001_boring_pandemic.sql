CREATE TABLE `apiKeys` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int NOT NULL,
	`keyName` varchar(255) NOT NULL,
	`keyValue` varchar(255) NOT NULL,
	`service` varchar(64),
	`isActive` boolean NOT NULL DEFAULT true,
	`lastUsedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `apiKeys_id` PRIMARY KEY(`id`),
	CONSTRAINT `apiKeys_keyValue_unique` UNIQUE(`keyValue`)
);
--> statement-breakpoint
CREATE TABLE `automationFlows` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`flowType` enum('review_request','satisfaction_check','smart_filler','referral_onboarding','reactivation') NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`triggerEvent` varchar(64) NOT NULL,
	`conditions` text,
	`steps` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `automationFlows_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `businessHours` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int NOT NULL,
	`dayOfWeek` int NOT NULL,
	`openTime` varchar(5),
	`closeTime` varchar(5),
	`isClosed` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `businessHours_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `businesses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`businessType` enum('barbershop','salon','spa','restaurant','gym','other') NOT NULL,
	`phone` varchar(20),
	`email` varchar(320),
	`address` text,
	`timezone` varchar(64) NOT NULL DEFAULT 'America/Mexico_City',
	`gmbConnected` boolean NOT NULL DEFAULT false,
	`gmbPlaceId` varchar(255),
	`gmbAccessToken` text,
	`gmbRefreshToken` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `businesses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `campaigns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` enum('review_request','reactivation','smart_filler','referral','custom') NOT NULL,
	`status` enum('draft','scheduled','active','paused','completed') NOT NULL DEFAULT 'draft',
	`channel` enum('sms','whatsapp','email','push') NOT NULL,
	`messageTemplate` text NOT NULL,
	`targetAudience` text,
	`scheduledAt` timestamp,
	`completedAt` timestamp,
	`totalSent` int NOT NULL DEFAULT 0,
	`totalOpened` int NOT NULL DEFAULT 0,
	`totalClicked` int NOT NULL DEFAULT 0,
	`totalConverted` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `campaigns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`phone` varchar(20),
	`email` varchar(320),
	`preferredLanguage` enum('es','en') NOT NULL DEFAULT 'es',
	`optedInSms` boolean NOT NULL DEFAULT false,
	`optedInWhatsapp` boolean NOT NULL DEFAULT false,
	`optedInEmail` boolean NOT NULL DEFAULT false,
	`tags` text,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastVisitAt` timestamp,
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int NOT NULL,
	`eventType` varchar(64) NOT NULL,
	`entityType` varchar(64),
	`entityId` int,
	`payload` text,
	`processed` boolean NOT NULL DEFAULT false,
	`processedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messageTemplates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int,
	`name` varchar(255) NOT NULL,
	`type` enum('review_request','satisfaction_check','reactivation','referral','negative_review_response','custom') NOT NULL,
	`language` enum('es','en') NOT NULL DEFAULT 'es',
	`channel` enum('sms','whatsapp','email','push') NOT NULL,
	`subject` varchar(255),
	`content` text NOT NULL,
	`variables` text,
	`isDefault` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `messageTemplates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int NOT NULL,
	`contactId` int NOT NULL,
	`campaignId` int,
	`channel` enum('sms','whatsapp','email','push') NOT NULL,
	`messageType` varchar(64),
	`content` text NOT NULL,
	`status` enum('pending','sent','delivered','failed','opened','clicked') NOT NULL DEFAULT 'pending',
	`externalId` varchar(255),
	`errorMessage` text,
	`sentAt` timestamp,
	`deliveredAt` timestamp,
	`openedAt` timestamp,
	`clickedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `referrals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int NOT NULL,
	`referrerId` int NOT NULL,
	`referredId` int,
	`referralCode` varchar(32) NOT NULL,
	`qrCodeUrl` text,
	`status` enum('pending','redeemed','expired') NOT NULL DEFAULT 'pending',
	`rewardType` varchar(64),
	`rewardValue` int,
	`redeemedAt` timestamp,
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `referrals_id` PRIMARY KEY(`id`),
	CONSTRAINT `referrals_referralCode_unique` UNIQUE(`referralCode`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int NOT NULL,
	`contactId` int,
	`visitId` int,
	`platform` enum('google','facebook','yelp','other') NOT NULL,
	`rating` int NOT NULL,
	`reviewText` text,
	`reviewerName` varchar(255),
	`reviewUrl` text,
	`responded` boolean NOT NULL DEFAULT false,
	`responseText` text,
	`respondedAt` timestamp,
	`reviewDate` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `slowSlots` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int NOT NULL,
	`dayOfWeek` int NOT NULL,
	`hourStart` int NOT NULL,
	`hourEnd` int NOT NULL,
	`avgOccupancy` int NOT NULL DEFAULT 0,
	`lastDetectedAt` timestamp NOT NULL,
	`promoActive` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `slowSlots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `visits` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int NOT NULL,
	`contactId` int NOT NULL,
	`visitDate` timestamp NOT NULL,
	`service` varchar(255),
	`amount` int,
	`staffMember` varchar(255),
	`notes` text,
	`satisfactionScore` int,
	`reviewRequested` boolean NOT NULL DEFAULT false,
	`reviewRequestedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `visits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','owner','manager','staff') NOT NULL DEFAULT 'user';
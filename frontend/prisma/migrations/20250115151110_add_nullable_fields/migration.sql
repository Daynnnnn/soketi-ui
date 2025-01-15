-- AlterTable
ALTER TABLE "App" ALTER COLUMN "maxPresenceMembersPerChannel" DROP NOT NULL,
ALTER COLUMN "maxPresenceMemberSizeInKb" DROP NOT NULL,
ALTER COLUMN "maxChannelNameLength" DROP NOT NULL,
ALTER COLUMN "maxEventChannelsAtOnce" DROP NOT NULL,
ALTER COLUMN "maxEventNameLength" DROP NOT NULL,
ALTER COLUMN "maxEventPayloadInKb" DROP NOT NULL,
ALTER COLUMN "maxEventBatchSize" DROP NOT NULL,
ALTER COLUMN "webhooks" DROP NOT NULL,
ALTER COLUMN "enableUserAuthentication" DROP NOT NULL;

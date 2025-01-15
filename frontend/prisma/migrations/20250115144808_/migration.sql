-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "maxConnections" INTEGER NOT NULL,
    "enableClientMessages" INTEGER NOT NULL,
    "enabled" INTEGER NOT NULL,
    "maxBackendEventsPerSec" INTEGER NOT NULL,
    "maxClientEventsPerSec" INTEGER NOT NULL,
    "maxReadReqPerSec" INTEGER NOT NULL,
    "maxPresenceMembersPerChannel" INTEGER NOT NULL,
    "maxPresenceMemberSizeInKb" INTEGER NOT NULL,
    "maxChannelNameLength" INTEGER NOT NULL,
    "maxEventChannelsAtOnce" INTEGER NOT NULL,
    "maxEventNameLength" INTEGER NOT NULL,
    "maxEventPayloadInKb" INTEGER NOT NULL,
    "maxEventBatchSize" INTEGER NOT NULL,
    "webhooks" JSONB NOT NULL,
    "enableUserAuthentication" INTEGER NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "App_key_idx" ON "App"("key");

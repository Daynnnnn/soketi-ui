import { z } from "zod";
import * as crypto from "node:crypto";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const soketiAppRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.db.app.findMany();
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.app.create({
        data: {
          name: input.name,
          key: crypto.randomBytes(20).toString('hex'),
          secret: crypto.randomBytes(20).toString('hex'),
          enabled: 1,
          enableClientMessages: 0,
          enableUserAuthentication: 0,
          maxConnections: -1,
          maxBackendEventsPerSec: -1,
          maxClientEventsPerSec: -1,
          maxReadReqPerSec: -1,
        },
      });
    }),
});

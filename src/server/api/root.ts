import { createTRPCRouter } from "~/server/api/trpc"
import { linkShortnerRouter } from "~/server/api/routers/linkShortner"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  linkShortner: linkShortnerRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

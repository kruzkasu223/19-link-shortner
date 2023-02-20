import { z } from "zod"
import {
  ALIAS_EXIST,
  ALIAS_NOT_EXIST,
  ALIAS_REQUIRED,
  ALIAS_URL_REQUIRED,
} from "~/constants"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const linkShortnerRouter = createTRPCRouter({
  getLink: publicProcedure
    .input(z.object({ alias: z.string().min(1, ALIAS_REQUIRED) }))
    .query(async ({ input, ctx }) => {
      if (!input.alias) throw Error(ALIAS_REQUIRED)

      const data = await ctx.prisma.links.findUnique({
        where: {
          alias: input.alias,
        },
      })

      if (!data?.url) throw Error(ALIAS_NOT_EXIST)

      return {
        url: data.url,
      }
    }),

  addLink: publicProcedure
    .input(
      z.object({
        alias: z.string().min(1, ALIAS_REQUIRED),
        url: z.string().url(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!(input.alias && input.url)) throw Error(ALIAS_URL_REQUIRED)

      const findAlias = await ctx.prisma.links.findUnique({
        where: {
          alias: input.alias,
        },
      })

      if (findAlias?.url) throw Error(ALIAS_EXIST)

      const data = await ctx.prisma.links.create({
        data: {
          url: input.url,
          alias: input.alias,
        },
      })

      return {
        success: true,
        alias: data.alias,
      }
    }),
})

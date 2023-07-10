import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../services/prisma'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async (req, res) => {
    const paramsSchema = z.object({
      page: z.string(),
    })

    const { page } = paramsSchema.parse(req.query)

    const offset = page !== undefined
      ? (Number(page) - 1) * 10
      : 0

    const users = await prisma.user.findMany({
      skip: offset,
      take: 10,
    })

    const total = await prisma.user.count()

    return { users, total }
  })
  
  app.post('/', async (req, res) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
    })

    const { name, email } = bodySchema.parse(req.body)
  
    await prisma.user.create({
      data: {
        name,
        email,
      },
    })
  
    res.status(201)
  })
}

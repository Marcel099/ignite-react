import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../services/prisma'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async (req, res) => {
    const users = await prisma.user.findMany()
    return { users }
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

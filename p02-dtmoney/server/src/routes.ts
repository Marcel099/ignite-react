import { Router } from 'express'
import { z } from 'zod'

import { prisma } from './services/prisma'

const routes = Router()

routes.get('/transactions', async (request, response) => {
  const transactions = await prisma.transaction.findMany()

  return response.json(transactions)
})

routes.post('/transactions', async (request, response) => {
  const paramsSchema = z.object({
    title: z.string(),
    type: z.enum(['deposit', 'withdraw']),
    category: z.string(),
    amount: z.number(),
  })

  const { 
    title,
    type,
    category,
    amount,
  } = paramsSchema.parse(request.body)

  await prisma.transaction.create({
    data: {
      title,
      type,
      category,
      amount,
    }
  })

  return response.status(201).send()
})

export { routes }

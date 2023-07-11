import Fastify from 'fastify'
import cors from '@fastify/cors'
import { ZodError } from 'zod'

import { usersRoutes } from './routes/usersRoutes'

const app = Fastify()

app.register(cors, {
  origin: true,
})

app.register(usersRoutes, {
  prefix: '/users'
})

app.setErrorHandler(function (error, req, res) {
  if (error instanceof ZodError) {
    console.log(error)
    res.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Os dados enviados são inválidos.',
      issues: error.issues,
    })
  }

  res.status(500).send(error)
})

app
  .listen({
    host: ('RENDER' in process.env) ? '0.0.0.0' : 'localhost',
    port: Number(process.env.PORT) || 3333
  })
  .then(() => {
    console.log('HTTP server running')
  })

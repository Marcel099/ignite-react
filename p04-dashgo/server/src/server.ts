import Fastify from 'fastify'
import cors from '@fastify/cors'

const app = Fastify()

app.register(cors, {
  origin: true,
})

app.get('/', async (req, res) => {
  return { hello: 'world' }
})

app
  .listen({
    port: 3333
  })
  .then(() => {
    console.log('HTTP server running on port 3333')
  })

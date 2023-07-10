import { ActiveModelSerializer, createServer, Factory, Model, Response } from 'miragejs'
import faker from 'faker'

type User = {
  name: string
  email: string
  createdAt: string
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(idx) {
          return `User ${idx + 1}`
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        createdAt() {
          return faker.date.recent(10)
        }
      })
    },

    seeds(server) {
      server.createList('user', 194)
    },

    routes() {
      this.namespace = 'api'
      this.timing = 750

      this.get('/users', function(schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams

        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page)
        const pageEnd = Number(page) * Number(per_page)

        const users = this.serialize(schema.all('user'))
          .users
          // .sort((a, b) =>    // não funcionou
          //   new Date(a.created_at).toISOString() < new Date(b.created_at).toISOString()
          // )
          .slice(pageStart, pageEnd)

        return new Response(
          200,
          { 'x-total-count': String(total) },
          users
        )
      })
      this.get('/users/:id')
      this.post('/users')

      this.namespace = ''
      this.passthrough()
    },
  })

  return server
}

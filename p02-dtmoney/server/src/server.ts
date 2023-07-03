import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'

import { routes } from './routes'
import { ZodError } from 'zod'

const app = express()

app.use(express.json())
app.use(cors())

app.use(routes);

app.use(
  (
    error: Error,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    if (error instanceof ZodError) {
      response.status(400).json(error)
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${error.message}`,
    })
  }
)

app.listen(3333, () => console.log('Server is running'))

import 'dotenv/config'
import cors from 'cors'
import express from 'express'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/hello', (request, response) => {
  response.send('Hello world')
})

app.listen(3333, () => console.log('Server is running'))

import express from 'express'
import type { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { parseData } from './parser'

const app = express()
const PORT = 3000
dotenv.config()

app.use(cors())
app.use(bodyParser.json())

app.get('/api/data', async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      `${process.env.STRAPI_BASE_URL}/api/demos/${process.env.DEMO_ID}?populate=*`
    )
    const { data } = await response.json()
    const item = parseData(data)
    res.send(item)
  } catch (error) {
    console.error({ error })
    res.status(500).send('Error fetching data from Strapi')
  }
})

app.listen(PORT, () => console.info(`Server is running on http://localhost:${PORT}`))

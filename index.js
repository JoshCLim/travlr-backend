import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

const app = express()
const port = 8000

import pkg from 'pg';

const client = new pkg.Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.DBNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  })
await client.connect()
 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})
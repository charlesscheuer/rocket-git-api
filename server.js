const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const knex = require('knex')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
})

app.post('/register', (req, res) => {
  const { email } = req.body
  db('email')
    .insert({
      email: email
    })
    .then(() => {
      res.json('success')
    })
    .catch(err => res.status(400).json(err))
})

app.get('/count', (req, res) => {
  db.select('*')
    .from('email')
    .then(emails => {
      return emails.length
    })
    .then(count => {
      res.json(count)
    })
    .catch(err => res.status(400).json(err))
})

app.get('/', (req, res) => {
  res.json('server is working')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on: ${process.env.PORT}`)
})

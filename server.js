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
    host: '127.0.0.1', // which is the same as localhost
    user: 'frankscheuer', // the user who made the database
    password: '',
    database: 'rocket'
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
    .catch(err =>
      res
        .status(400)
        .json(
          'Unable to register, please try again. If the problem persists please contact us.'
        )
    )
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
    .catch(() => res.json('450'))
})

app.get('/', (req, res) => {
  res.json('it worked')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on: ${process.env.PORT}`)
})

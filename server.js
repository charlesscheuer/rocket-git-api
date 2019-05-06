const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', // which is the same as localhost
      user : 'frankscheuer', // the user who made the database
      password : '',
      database : 'rocket'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/register', (req, res)=> {
    const { email } = req.body;
    db('email')
    .insert({
        email: email
    })
    .then(() => {
        res.json('success')
    })
    .catch(err => res.status(400).json('Unable to register, please try again. If the problem persists please contact us.'))
})

app.get('/count', (req, res) => {
    db.select('*').from('email')
    .then(emails => {
        return emails.length
    })
    .then(count => {
        res.json(count)
    })
    .catch(() => res.json('450'))
})

app.listen(3000, () => {
    console.log('listening')
})
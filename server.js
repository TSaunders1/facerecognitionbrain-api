const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-horizontal-76795',
    user : 'tobysaunders',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working!')});

app.post('/signin', (signin.handleSignin(db, bcrypt)));

app.post('/register', (register.handleRegister(db, bcrypt)));

app.get('/profile/:id', (profile.handleProfileGet(db)));

app.put('/image', (image.handleImagePut(db)));

app.post('/imageurl', (image.handleAPICall));

app.listen(process.env.PORT || 3001, () => {
  console.log(`app is running on port ${process.env.PORT}`)
})

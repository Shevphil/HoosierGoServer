require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./db');

// let event = require('./controllers/eventcontroller');
let post = require('./controllers/postcontroller');
let comment = require('./controllers/commentcontroller');
let users = require('./controllers/usercontroller');
let event = require('./controllers/eventcontroller');


sequelize.sync();
// sequelize.sync({force: true})
app.use(require('./middleware/headers'));
app.use(express.json());

// app.use('/events', event) 

app.use('/posts', post)

app.use('/events', event)

app.use('/comments', comment)

app.use('/user', users)

app.use('/test', function( req, res) {
    res.send('Hey this is a test endpoint')
})

app.listen(3000, function(){
    console.log('App is listening on port 3000');
})
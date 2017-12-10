'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const connection= require('./scripts/dbconnection.js');
const dbutilities= require('./scripts/dbutilities.js');
const PORT = process.env.PORT || 3000;
const app = express();
//const conString = 'postgres://nickhoszko@localhost:5432/nickhoszko';
const client = new pg.Client(connection.conString);
client.connect();
client.on('error', function(error) {
  console.error(error);
});

app.listen(PORT, function(){
  console.log(`Listening on port: ${PORT}`);
});

dbutilities.loadDB(client);

// Base route for serving up HTML
app.get('/', function(request, response) {
  response.sendFile('./index.html')
})

// DB routes for CRUD operations
app.get('neighborhoods', function(request, response) {
  client.query('SELECT * FROM neighborhood;')
  .then(function(data) {
    response.send(data)
  })
  .catch(function(err) {
    console.error(err)
  })
})

app.get('user', function(request, response) {
  client.query('SELECT * FROM users;')
  .then(function(data) {
    response.send(data)
  })
  .catch(function(err) {
    console.error(err)
  })
})




app.post('user', function(request, response) {
  client.query(`
    INSERT INTO users(first_name, last_name, neighborhood, user_name, password)
    VALUES($1, $2, $3, $4, $5);
    `,
    [
      request.body.first_name,
      request.body.last_name,
      request.body.neighborhood,
      request.body.user_name,
      request.body.password,
    ]
  )
  .then(function(data) {
    response.redirect('/')
  })
  .catch(function(err) {
    console.error(err)
  })
})

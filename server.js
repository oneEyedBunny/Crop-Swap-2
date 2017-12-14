'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const connection= require('./server_scripts/dbconnection.js');
const dbutilities= require('./server_scripts/dbutilities.js');
const PORT = process.env.PORT || 3000;
const app = express();
//const conString = 'postgres://nickhoszko@localhost:5432/nickhoszko';
const client = new pg.Client(connection.conString);
client.connect();
client.on('error', function(error) {
  console.error(error);
});

app.listen(PORT, function() {
  console.log(`Listening on port: ${PORT}`);
});

dbutilities.loadDB(client);
dbutilities.loadNeighborhood(client);
dbutilities.loadUsers(client);
dbutilities.loadCrops(client);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

// Base route for serving up HTML
app.get('/', function(request, response) {
  response.sendFile('public/index.html')
});

// DB routes for CRUD operations
app.get('/neighborhoods', function(request, response) {
  client.query('SELECT * FROM neighborhood;')
  .then(function(data) {
    response.send(data.rows)
  })
  .catch(function(err) {
    console.error(err)
  })
});

app.get('/user', function(request, response) {
  client.query('SELECT * FROM users;')
  .then(function(data) {
    response.send(data.rows)
  })
  .catch(function(err) {
    console.error(err)
  })
});

app.get('/crops', function(request, response) {
  client.query('SELECT DISTINCT crop_name FROM crops;')
  .then(function(data) {
    response.send(data.rows)
  })
  .catch(function(err) {
    console.error(err)
  })
});

app.post('/crops', function(request, response) {
  client.query(
    `INSERT INTO crops(user_id, crop_name, quantity_available, quantity_reserved, crop_price)
    VALUES($1, $2, $3, $4, $5)`,
  [
    request.body.user_id,
    request.body.crop_name,
    request.body.quantity_available,
    request.body.quantity_reserved,
    request.body.crop_price,
  ]
)
.then(function(data) {
  response.send(data.rows);
})
.catch(function(err) {
  console.error(err)
})
});

app.get('/swap_history', function(request, response) {
  client.query('SELECT * FROM swap_history;')
  .then(function(data) {
    response.send(data.rows)
  })
  .catch(function(err) {
    console.error(err)
  })
})

app.post('/user', function(request, response) {
  client.query(`
    INSERT INTO users(first_name, last_name, neighborhood_id, user_name, password)
    VALUES($1, $2, $3, $4, $5)
    RETURNING user_id;
    `,
    [
      request.body.first_name,
      request.body.last_name,
      request.body.neighborhood_id,
      request.body.user_name,
      request.body.password,
    ]
  )
  .then(function(data) {
    console.log("new id", data.rows[0].user_id.toString());
    response.status(200).send(data.rows[0]);
    
  })
  .catch(function(err) {
    console.error(err)
  })
})

app.get('/locations/:cropName', function(request, response) {
  client.query(`
    SELECT neighborhood_name, address, swap_day, swap_time
    FROM neighborhood
    INNER JOIN users ON users.neighborhood_id = neighborhood.neighborhood_id
    INNER JOIN crops ON crops.user_id = users.user_id
    WHERE crops.crop_name = $1;
    `,
    [
    request.params.cropName,
    ]
  )
  .then(function(data) {
    response.send(data.rows)
  })
  .catch(function(err) {
    console.error(err)
  })
})

app.get('/crops/:user', function (request, response) {
  client.query(`
    SELECT crop_name, quantity_available, crop_price FROM crops
    WHERE user_id = $1;
    `,
  [
    request.params.user,
  ]
)
.then(function(data) {
  response.send(data.rows)
})
.catch(function(err) {
  console.error(err)
})
})

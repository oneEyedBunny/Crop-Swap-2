'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const connection= require('./scripts/dbconnection.js');
const dbutilties= require('./scripts/dbutilities.js');
const PORT = process.env.PORT || 3000;
const app = express();
//const conString = 'postgres://nickhoszko@localhost:5432/nickhoszko';
const client = new pg.Client(connection.conString);
client.connect();
client.on('error', function(error) {
  console.error(error);
});

dbutlities.loadDB();

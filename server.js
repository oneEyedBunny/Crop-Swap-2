'use strict'

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = 'postgres://nickhoszko@localhost:5432/nickhoszko';
const client = new pg.Client(conString);
client.connect();
client.on('error', function(error) {
  console.error(error);
});


function loadDB() {
    client.query (`
        CREATE TABLE IF NOT EXISTS neighborhood (
            neighborhood_id SERIAL PRIMARY KEY,
            name TEXT,
            address TEXT,
            swap_day TEXT,
            swap_time TEXT);`
        )
        .catch(function(error) {
            console.error(error);
        });

    client.query (`
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            first_name TEXT,
            last_name TEXT,
            neighborhood TEXT,
            user_name TEXT,
            password TEXT);`
        )
        .catch(function(error) {
            console.error(error);
        });

    client.query (`
        CREATE TABLE IF NOT EXISTS crops (
            crop_id SERIAL PRIMARY KEY,
            user_id TEXT,
            crop_name TEXT,
            quantity_available INTEGER,
            quantity_reserved INTEGER,
            crop_price INTEGER);`
        )
        .catch(function(error) {
            console.error(error);
        });

    client.query (`
        CREATE TABLE IF NOT EXISTS swap_history (
            swap_history_id SERIAL PRIMARY KEY,
            user_id_seller TEXT,
            user_id_buyer TEXT,
            crop_name TEXT,
            crop_price INTEGER,
            quantity_reserved INTEGER,
            seller_rating INTEGER);`
        )
        .catch(function(error) {
            console.error(error);
        });
}

function loadCrops() {
  client.query('SELECT COUNT(*) FROM crops')
  .then(function(result) {
    if(!parseInt(result.rows[0].count)) {
      fs.readFile('data/crops.json', function(error, fd) {
        JSON.parse(fd.toString()).forEach(function(element) {
          client.query(
            `INSERT INTO
            crops(user_id, crop_name, quantity_available, quantity_reserved, crop_price)
            VALUES ('hoszie', 'carrots', 10, 4, 1) ON CONFLICT DO NOTHING,
            VALUES ('sandraul', 'kale', 8, 2, 2) ON CONFLICT DO NOTHING`,
          )
        })
      })
    }
  })
}

function loadNeiborhood() {
  client.query('SELECT COUNT(*) FROM neighborhood')
  .then(function(result) {
    if(!parseInt(result.rows[0].count)) {
      fs.readFile('data/neighborhood.json', function(error, fd) {
        JSON.parse(fd.toString()).forEach(function(element) {
          client.query(
            `INSERT INTO
            neighborhood(name, address, swap_day, swap_time)
            VALUES ('Sellwood', '8300 SE 15th Ave, Portland, OR 97202', 'Saturday', '2:00pm')
            VALUES (PSU, '1825 SW Broadway, Portland, OR 97201', 'Sunday', '1:00pm')
            ON CONFLICT DO NOTHING`,
          )
        })
      })
    }
  })
}

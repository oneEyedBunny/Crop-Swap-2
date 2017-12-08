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

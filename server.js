'use strict';

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

function loadUsers() {
    client.query('SELECT COUNT (*) FROM users')
    .then(function(result) {
        if(!parseInt(results.rows[0].count)) {
            fs.readFile('data/users.json', function(err, fd) {
                JSON.parse(fd.toString()).forEach(function(ele) {
                    client.query(
                    `INSERT INTO
                    users (first_name, last_name, neighborhood, user_name, password)
                    VALUES (jimmy, john, PSU, johnjohn, PSU123) ON CONFLICT DO NOTHING,
                    VALUES (nick, hoszko, northeast, hoszie, nojiri123) ON CONFLICT DO NOTHING`,
                    )
                })
            })
        }
    })
}

function swap_history() {
    client.query('SELECT COUNT (*) FROM swap_history')
    .then(function(result) {
        if(!parseInt(results.rows[0].count)) {
            fs.readFile('data/swap_history.json', function(err, fd) {
                JSON.parse(fd.toString()).forEach(function(ele) {
                    client.query(
                    `INSERT INTO
                    swap_history (user_id_seller, user_id_buyer, crop_name, crop_price, quantity_reserved, seller_rating)
                    VALUES (hoszie, johnjohn, carrots, 1, 4, 5) ON CONFLICT DO NOTHING`,
                    )
                })
            })
        }
    })
}

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

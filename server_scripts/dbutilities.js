module.exports = {
  loadDB: function(client) {
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
  },

  loadCrops: function() {
    client.query('SELECT COUNT(*) FROM crops')
    .then(function(result) {
      if(!parseInt(result.rows[0].count)) {
        fs.readFile('data/crops.json', function(error, fd) {
          JSON.parse(fd.toString()).forEach(function(element) {
            client.query(
              `INSERT INTO
              crops(user_id, crop_name, quantity_available, quantity_reserved, crop_price)
              VALUES ('hoszie', 'carrots', 10, 4, 1) ON CONFLICT DO NOTHING,
              VALUES ('sandraul', 'kale', 8, 2, 2) ON CONFLICT DO NOTHING`
            )
          })
        })
      }
    })
  },

  loadNeighborhood: function() {
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
              ON CONFLICT DO NOTHING`
            )
          })
        })
      }
    })
  },
  loadUsers: function() {
      client.query('SELECT COUNT (*) FROM users')
      .then(function(result) {
          if(!parseInt(results.rows[0].count)) {
              fs.readFile('data/users.json', function(err, fd) {
                  JSON.parse(fd.toString()).forEach(function(ele) {
                      client.query(
                      `INSERT INTO
                      users (first_name, last_name, neighborhood, user_name, password)
                      VALUES (jimmy, john, PSU, johnjohn, PSU123) ON CONFLICT DO NOTHING,
                      VALUES (nick, hoszko, northeast, hoszie, nojiri123) ON CONFLICT DO NOTHING`
                      )
                  })
              })
          }
      })
  },

  swap_history: function() {
      client.query('SELECT COUNT (*) FROM swap_history')
      .then(function(result) {
          if(!parseInt(results.rows[0].count)) {
              fs.readFile('data/swap_history.json', function(err, fd) {
                  JSON.parse(fd.toString()).forEach(function(ele) {
                      client.query(
                      `INSERT INTO
                      swap_history (user_id_seller, user_id_buyer, crop_name, crop_price, quantity_reserved, seller_rating)
                      VALUES (hoszie, johnjohn, carrots, 1, 4, 5) ON CONFLICT DO NOTHING`
                      )
                  })
              })
          }
      })
  }
}

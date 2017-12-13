//function that creates all the DB tables & loads data into them
module.exports = {
  loadDB: function(client) {
      client.query (`DROP SCHEMA IF EXISTS public CASCADE`);
      client.query (`CREATE SCHEMA public`);
      client.query (`
          CREATE TABLE IF NOT EXISTS neighborhood (
              neighborhood_id SERIAL PRIMARY KEY,
              neighborhood_name TEXT,
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
              neighborhood_id INTEGER NOT NULL REFERENCES neighborhood(neighborhood_id),
              user_name TEXT,
              password TEXT);`
          )
          .catch(function(error) {
              console.error(error);
          });

      client.query (`
          CREATE TABLE IF NOT EXISTS crops (
              crop_id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL REFERENCES users(user_id),
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
//function that loads hardcoded nieghborhood data
  loadNeighborhood: function(client) {
    client.query('SELECT COUNT(*) FROM neighborhood')
    .then(function(result) {
      if(!parseInt(result.rows[0].count)) {
        // fs.readFile('data/neighborhood.json', function(error, fd) {
        //   JSON.parse(fd.toString()).forEach(function(element) {
            client.query(
              `INSERT INTO
              neighborhood (neighborhood_name, address, swap_day, swap_time)
              VALUES ('Sellwood', '8300 SE 15th Ave, Portland, OR 97202', 'Saturday', '2:00pm'),
             ('PSU', '1825 SW Broadway, Portland, OR 97201', 'Sunday', '1:00pm')
              ON CONFLICT DO NOTHING`
            )
        //   })
        // })
      }
    })
  },
//function that loads hardcoded crop data
  loadCrops: function(client) {
    client.query('SELECT COUNT(*) FROM crops')
    .then(function(result) {
      if(!parseInt(result.rows[0].count)) {
        // fs.readFile('data/crops.json', function(error, fd) {
        //   JSON.parse(fd.toString()).forEach(function(element) {
            client.query(
              `INSERT INTO
              crops(user_id, crop_name, quantity_available, quantity_reserved, crop_price)
              SELECT user_id,'carrots', 10, 4, 1
              FROM users
              WHERE first_name = 'jimmy'
              ON CONFLICT DO NOTHING;

              INSERT INTO
              crops(user_id, crop_name, quantity_available, quantity_reserved, crop_price)
              SELECT user_id,'kale', 8, 2, 2
              FROM users
              WHERE first_name = 'nick'
              ON CONFLICT DO NOTHING;`
            )
                    //   })
        // })
      }
    })
  },
//function that loads hard coded user data
  loadUsers: function(client) {
      client.query('SELECT COUNT (*) FROM users')
      .then(function(result) {
          if(!parseInt(result.rows[0].count)) {
              // fs.readFile('data/users.json', function(err, fd) {
              //     JSON.parse(fd.toString()).forEach(function(ele) {
                      client.query(
                      `INSERT INTO
                      users (first_name, last_name, neighborhood_id, user_name, password)
                      SELECT 'jimmy','john', neighborhood_id,'johnjohn', 'psu123'
                      FROM neighborhood
                      WHERE neighborhood_name= 'PSU'
                      ON CONFLICT DO NOTHING;

                      INSERT INTO
                      users (first_name, last_name, neighborhood_id, user_name, password)
                      SELECT 'nick','hoszko', neighborhood_id,'hoszie', 'nojiri123'
                      FROM neighborhood
                      WHERE neighborhood_name= 'Sellwood'
                      ON CONFLICT DO NOTHING;`
                      )
                      console.log("finished adding users")
              //     })
              // })
          }
      })
  },

  // function that loads hard coded swap_history data
  swap_history: function(client) {
      client.query('SELECT COUNT (*) FROM swap_history')
      .then(function(result) {
          if(!parseInt(result.rows[0].count)) {
              // fs.readFile('data/swap_history.json', function(err, fd) {
              //     JSON.parse(fd.toString()).forEach(function(ele) {
                      client.query(
                      `INSERT INTO
                      swap_history (user_id_seller, user_id_buyer, crop_name, crop_price, quantity_reserved, seller_rating)
                      VALUES ('hoszie', 'johnjohn', 'carrots', 1.50, 4, 5) ON CONFLICT DO NOTHING`
                      )
              //     })
              // })
          }
      })
  }
};


`SELECT * FROM neighborhood
INNER JOIN users ON users.neighborhood_id = neighborhood.neighborhood_id
INNER JOIN crops ON crops.user_id = user.user_id_buyer
WHERE crops.crop_name = $1`

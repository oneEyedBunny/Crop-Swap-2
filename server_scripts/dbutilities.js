//function that creates all the DB tables
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

  //     client.query (`
  //         CREATE TABLE IF NOT EXISTS swap_history (
  //             swap_history_id SERIAL PRIMARY KEY,
  //             user_id_seller TEXT,
  //             user_id_buyer TEXT,
  //             crop_name TEXT,
  //             crop_price INTEGER,
  //             quantity_reserved INTEGER,
  //             seller_rating INTEGER);`
  //         )
  //         .catch(function(error) {
  //             console.error(error);
  //         });
  },
//function that loads static nieghborhood data
loadNeighborhood: function(client) {
  client.query('SELECT COUNT(*) FROM neighborhood')
  .then(function(result) {
    if(!parseInt(result.rows[0].count)) {
      client.query(
        `INSERT INTO
        neighborhood (neighborhood_name, address, swap_day, swap_time)
        VALUES
        ('Sellwood', '8300 SE 15th Ave, Portland, OR 97202', 'Saturday', '10AM-2PM'),
        ('PSU', '1825 SW Broadway, Portland, OR 97201', 'Sunday', '12PM-4PM'),
        ('The Pearl', '1236 Marshall St, Portland, OR 97209', 'Thursday', '6PM-9PM'),
        ('Northeast', '2035 NE Alberta St, Portland, OR 97212', 'Monday', '5:30PM-9PM'),
        ('Southeast', '3203 SE Woodstock Blvd, Portland, OR 97202', 'Saturday', '11AM-1PM')
        ON CONFLICT DO NOTHING`
      )
    }
  })
},
//function that loads demo crop data
loadCrops: function(client) {
  client.query('SELECT COUNT(*) FROM crops')
  .then(function(result) {
    if(!parseInt(result.rows[0].count)) {
      client.query(
        `INSERT INTO
        crops(user_id, crop_name, quantity_available, quantity_reserved, crop_price)
        SELECT user_id,'carrots', 10, 4, 1
        FROM users
        WHERE first_name = 'Sandra'
        ON CONFLICT DO NOTHING;

        INSERT INTO
        crops(user_id, crop_name, quantity_available, quantity_reserved, crop_price)
        SELECT user_id,'kale', 8, 2, 2
        FROM users
        WHERE first_name = 'Nick'
        ON CONFLICT DO NOTHING;`
      )
    }
  })
},
//function that loads demo user data
  loadUsers: function(client) {
      client.query('SELECT COUNT (*) FROM users')
      .then(function(result) {
          if(!parseInt(result.rows[0].count)) {
              // fs.readFile('data/users.json', function(err, fd) {
              //     JSON.parse(fd.toString()).forEach(function(ele) {
                      client.query(
                      `INSERT INTO
                      users (first_name, last_name, neighborhood_id, user_name, password)
                      SELECT 'Nick','Hoszko', neighborhood_id,'nhoszko', 'NH123'
                      FROM neighborhood
                      WHERE neighborhood_name= 'Northeast'
                      ON CONFLICT DO NOTHING;

                      INSERT INTO
                      users (first_name, last_name, neighborhood_id, user_name, password)
                      SELECT 'Sandra','Ultreras', neighborhood_id,'sandraultreras', 'SU123'
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
  // swap_history: function(client) {
  //   client.query('SELECT COUNT (*) FROM swap_history')
  //   .then(function(result) {
  //     if(!parseInt(result.rows[0].count)) {
  //       client.query(
  //         `INSERT INTO
  //         swap_history (user_id_seller, user_id_buyer, crop_name, crop_price, quantity_reserved, seller_rating)
  //         VALUES ('hoszie', 'johnjohn', 'carrots', 1.50, 4, 5) ON CONFLICT DO NOTHING`
  //       )
  //     }
  //   })
  // }
};

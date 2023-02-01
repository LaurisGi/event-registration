const mysql = require('mysql2');
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { restart } = require('nodemon');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
  };
  
  const connection = mysql.createConnection(mysqlConfig);


  app.get('/login', (req, res) => {
    const { id } = req.params;
  connection.execute('SELECT * FROM users', (err, users) => {
    res.send(users);
   });
  });

  app.post('/register', (req, res) =>  {
    const { name, surname, email, password } = req.body;
    connection.execute(
      'SELECT email FROM users WHERE email = ?',
      [email],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send({ message: 'There was a problem registering, please try again later' });
        } else if (results.length > 0) {
          res.status(400).send({ message: 'Email already exists' });
        } else {
          const hashedPassword = bcrypt.hashSync(password, 12);
          connection.execute(
            'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)',
            [name, surname, email, hashedPassword], (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).send({ message: 'There was a problem registering, please try again later' });
              } else {
                res.status(200).send({message: 'OK'});
              }
            });
        }
      });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Express server running on PORT:${PORT}`));
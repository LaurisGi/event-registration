const mysql = require('mysql2');
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
  };
  
  const connection = mysql.createConnection(mysqlConfig);

  connection.execute('SELECT * FROM users', (err, expenses) => {
    console.log(expenses);
   });

const PORT = 8000;
app.listen(PORT, () => console.log(`Express server running on PORT:${PORT}`));
// const mysql = require('mysql2');
const express = require('express');
// const bcrypt = require('bcrypt');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
require('dotenv').config();
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());



// const mysqlConfig = {
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     port: process.env.MYSQL_PORT
//   };
  
//   const connection = mysql.createConnection(mysqlConfig);

  // const sendErrorResponse = (res, statusCode, message) => {
  //   return res.status(statusCode).json({ message });
  // };

app.use('/user', userRoutes)


//   app.post('/register', (req, res) =>  {
//     const { name, surname, email, password } = req.body;
//     connection.execute(
//       'SELECT email FROM users WHERE email = ?',
//       [email],
//       (err, results) => {
//         if (err) {
//           sendErrorResponse(res, 500, 'There was a problem registering, please try again later');
//         } else if (results.length > 0) {
//           res.status(400).send({ message: 'Email already exists' });
//         } else {
//           const hashedPassword = bcrypt.hashSync(password, 12);
//           connection.execute(
//             'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)',
//             [name, surname, email, hashedPassword], (err, result) => {
//               if (err) {
//                 sendErrorResponse(res, 500, 'There was a problem registering, please try again later');
//               } else {
//                 res.status(200).send({message: 'OK'});
//               }
//             });
//         }
//       });
// });

// app.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   connection.query(
//     `SELECT * FROM users WHERE email = '${email}'`,
//     (error, result) => {
//       if (error) {
//         return sendErrorResponse(res, 500, 'An error occurred' );
//       } else {
//         if (!result.length) {
//           return sendErrorResponse(res, 401, 'Incorrect email or password');
//         } else {
//           const passwordHash = result[0].password;
//           const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);
//           if (isPasswordCorrect) {
//             const { id, email } = result[0];
//             const token = jwt.sign({ id, email }, process.env.JWT_SECRET_KEY);
//             return res.json({ token, id, email });
//           } else {
//             return sendErrorResponse(res, 401, 'Incorrect email or password');
//           }
//         }
//       }
//     }
//   );
// });

// app.get('/token/verify', (req, res) => {
//   try {
//       const token = req.headers.authorization.split(' ')[1];
//       const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
//       res.send(user);
//   } catch(e) {
//       res.send({ error: 'Invalid Token' });
//   }
// });

app.listen(process.env.PORT, () => console.log(`Express server running on PORT:${process.env.PORT}`));
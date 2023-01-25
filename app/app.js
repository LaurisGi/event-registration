const mysql = require('mysql2');
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();


const PORT = 8000;
app.listen(PORT, () => console.log(`Express server running on PORT:${PORT}`));
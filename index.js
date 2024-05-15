require('dotenv').config()
const mysql = require('mysql');
const bodyParser = require('body-parser');
const doxname = process.env.SECRET_USER
const PORT = process.env.PORT
console.log(doxname);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

console.log('Connecting to database with the following configuration:');
console.log('Host:', process.env.DB_HOST);
console.log('User:', process.env.DB_USER);
console.log('Database:', process.env.DB_NAME);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database successfully!');
});

// Describe table
connection.query('DESCRIBE employees', (err, results) => {
  if (err) {
    console.error('Error describing table:', err);
    return;
  }
  console.log('Table description:', results);
});

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello Geeks!')  // change this to index.html
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

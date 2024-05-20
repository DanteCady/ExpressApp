require('dotenv').config()
const express = require('express')
const app = express()
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const PORT = process.env.PORT

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password:  process.env.DB_PASSWORD, 
    database:  process.env.DB_NAME, 
    tableName:  process.env.DB_TABLE_NAME,
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});





app.use(bodyParser.urlencoded({ extended: true }));
app.post('/addemployee', (req, res) => {
    const { fname, lname, dept, jobTitle, hireDate, endDate, salary } = req.body;

    const employee = {
        FirstName: fname,
        LastName: lname,
        Department: dept,
        JobTitle: jobTitle,
        StartDate: hireDate,
        EndDate: endDate,
        Salary: salary
    };

    connection.query('INSERT INTO employees SET ?', employee, (err, result) => {
        if (err) {
            console.error('Error inserting employee:', err);
            res.status(500).send('Error inserting employee');
        } else {
            console.log('Employee added successfully');
            res.send('Employee added successfully');
        }
    });
});

app.post ('/login', (req, res) => {
    const {email, password} = req.body
    const query = 'SELECT * FROM users WHERE email = ?' 
    
    // Database query
    connection.query (query, email, (err, res) => {
      if (err) {
        console.error('Database Error!')
        return res.status(500).send({message: 'Databasee Error.'})
      }
      if (res.length === 0) {
        console.error('User Not Found!')
        return res.status(401).send({message: "User Not Found."})
      } else {
        console.log('Successful Login!')
        return res.status(200).send({ message: `User: ${email} logged In Successfully.`})
      }
    }
  )
})


app.listen(PORT, () => {
  console.log(`Node.js server running at http://localhost:${PORT}`);
  console.log(`add user to database at http://localhost:${PORT}/addemployee`);
})

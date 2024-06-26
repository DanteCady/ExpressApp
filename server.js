require('dotenv').config()
const express = require('express')
const cors = require('cors')
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




app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./mysqllogin/dashboard.html'));

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

    connection.query('INSERT INTO employees SET ?', employee, (err, res) => {
        if (err) {
            console.error('Error inserting employee:', err);
            res.status(500).send('Error inserting employee');
        } else { 
            console.log('Employee added successfully');
            res.send('Employee added successfully');
        }
    });
});



app.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE emailAddress = ?';
  
  // Database query
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database Error!', err);
      return res.status(500).send({ message: 'Database Error.' });
    }
    
    if (results.length === 0) {
      console.error('User Not Found!');
      return res.status(401).send({ message: "User Not Found." });
    }
    
    const loginDetails = results[0];
    if (email == loginDetails.emailAddress && password == loginDetails.password) {
      console.log('Successful Login!');
      setTimeout(() => {
        res.redirect('http://127.0.0.1:5500/ExpressApp/mysqllogin/dashboard.html');
      }, 5000);
    } else {
      console.error('Incorrect Password or Username');
      return res.status(401).send({ message: 'Incorrect Password or Username.', log: 'Incorrect Password or Username.'});
    }
  }
  );
}
);
 
app.get('/userDetails', (req, res) => {
  connection.query('SELECT * FROM users WHERE emailAddress = ?', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Error fetching users');
    } else {
      res.send(results);
    }
  }
  );
})

app.get('/employees', (req, res) => {
    connection.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            console.error('Error fetching employees:', err);
            res.status(500).send('Error fetching employees');
        } else {
            res.send(results);
        }
    });
}
);

app.listen(PORT, () => {
  console.log(`Node.js server running at http://localhost:${PORT}`);
  // console.log(`add user to database at http://localhost:${PORT}/addemployee`);
})


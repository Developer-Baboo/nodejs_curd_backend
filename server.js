import express from 'express';
import mysql from 'mysql';
import cors from 'cors';


// Creating an instance of the Express application
const app = express();
app.use(cors());
app.use(express.json());


// Creating a MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud',
})

// Defining a route for handling GET requests to the root path
app.get('/', (req, res) => {
    const sql = "SELECT * FROM student";
     // Executing the SQL query using the database connection
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    })
})

//create functionality
app.post('/student', (req, res) => {
    const sql = "INSERT INTO student (`NAME`, `EMAIL`) VALUES(?)";

     // Extracting values from the request body
    const values = [
        req.body.name,
        req.body.email,
]
    db.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})


//Read Functionality
app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM student WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    })
})

// Update Functionality
app.put('/update/:id', (req, res) => {
    const sql = 'UPDATE student SET `NAME` = ?, `EMAIL` = ? WHERE ID = ?';
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
        if (err) return res.json({ Message: "Error Inside Server" });
        return res.json(result);
    });
});

//Delete functionality
app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error Inside Server" });
        return res.json(result);
    });
})

app.listen(8081, () => {
    console.log('listening on http://localhost:8010');
});

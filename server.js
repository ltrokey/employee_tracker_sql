import dotenv from "dotenv";
import express from "express";
import { createConnection } from "mysql2";

dotenv.config(); // Load password from .env file

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to the database
const db = createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "company_db",
});

// Query database & callback function
// db.query('SELECT * FROM departments', function (err, results) {
//   console.log(results);
// });

// Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

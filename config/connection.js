const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "company_db",
});

function query(sql, args, callback) {
  return connection.query(sql, args, callback);
}

function close() {
  connection.end();
}

module.exports = {
  query,
  close,
};

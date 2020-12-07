const mysql = require("mysql");
const { HOST, USER, PASSWORD, DATABASE } = require("./config");

const connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
});

module.exports = connection;

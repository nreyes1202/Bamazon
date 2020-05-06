const inquirer = require("inquirer")
const mysql = require("mysql")
require("console.table")

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Bamazon'
  });
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });

  
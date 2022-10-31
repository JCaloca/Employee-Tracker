const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Creating connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "company_db",
});

// TODO: Add inquirer questions for first prompt
inquirer.prompt([
  {
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: [
      "View all departments.",
      "View all roles.",
      "View all employees.",
      "Add a department.",
      "Add a role.",
      "Add an employee.",
      "Update an employee role.",
    ],
  },
]);

// TODO: add function/ prompt for view all departments

// TODO: add function/ prompt for view all roles

// TODO: add function/ prompt for view all employees

// TODO: add function/ prompt for add a department

// TODO: add function/ prompt for add a role

// TODO: add function/ prompt for add an employee

// TODO: add function/ prompt for updating an employee

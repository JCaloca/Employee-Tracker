const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const { exit } = require("process");

// Creating connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "company_db",
});

// TODO: Add inquirer questions for first prompt
const initialPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      const { userChoice } = answers;
      if (userChoice === "View all departments") {
        viewDepartments();
      } else if (userChoice === "View all roles") {
        viewRoles();
      } else if (userChoice === "View all employees") {
        viewEmployees();
      } else if (userChoice === "Add a department") {
        addDepartment();
      } else if (userChoice === "Add a role") {
        addRole();
      } else if (userChoice === "Add an employee") {
        addEmployee();
      } else if (userChoice === "Update an employee role") {
        updateEmployee();
      } else if (userChoice === "Exit") {
        exit();
      }
    });
};

// TODO: add function/ prompt for view all departments

// TODO: add function/ prompt for view all roles

// TODO: add function/ prompt for view all employees

// TODO: add function/ prompt for add a department

// TODO: add function/ prompt for add a role

// TODO: add function/ prompt for add an employee

// TODO: add function/ prompt for updating an employee

initialPrompt();

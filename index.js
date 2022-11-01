const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const { exit } = require("process");

// Creating connection to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Rucais1stinkydog!",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

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
const viewDepartments = () => {
  db.query("SELECT * FROM departments", function (err, result) {
    if (err) {
      console.log(err);
    }
    console.table(result);
    initialPrompt();
  });
};
// TODO: add function/ prompt for view all roles
const viewRoles = () => {
  db.query("SELECT * FROM roles", function (err, result) {
    if (err) {
      console.log(err);
    }
    console.table(result);
    initialPrompt();
  });
};
// TODO: add function/ prompt for view all employees
const viewEmployees = () => {
  db.query("SELECT * FROM employee", function (err, result) {
    if (err) {
      console.log(err);
    }
    console.table(result);
    initialPrompt();
  });
};
// TODO: add function/ prompt for add a department
// function createDepartment(department) {
//   return db.promise().query("INSERT INTO departments ?", department);
// }
// // [req.params.genre]
// const addDepartment = () => {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "department_name",
//         message: "What is the department name?",
//       },
//     ])
//     .then((answer) => {
//       // var dept = answer.department_name;
//       // db.query(("INSERT INTO departments SET ?", dept), function (err, result) {
//       //   if (err) {
//       //     console.log(err);
//       //   } else console.log("Department successfully added!");
//       // });
//       // console.log(answer.department_name);
//       createDepartment(answer.department_name)
//         .then(() => {
//           console.log("Added Department to table.");
//         })
//         .then(() => initialPrompt());
//     });
// };
// TODO: add function/ prompt for add a role
const addRole = () => {};
// TODO: add function/ prompt for add an employee
const addEmployee = () => {};

// TODO: add function/ prompt for updating an employee
const updateEmployee = () => {};

// Initialize application
initialPrompt();

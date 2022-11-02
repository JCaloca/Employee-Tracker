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
        updateEmployeeRole();
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
  db.query(
    "SELECT roles.id, roles.title, departments.department_name, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id",
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.table(result);
      initialPrompt();
    }
  );
};
// TODO: add function/ prompt for view all employees
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const viewEmployees = () => {
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.department_name AS department, roles.salary, manager.first_name  AS manager FROM employee JOIN roles ON employee.role_id = roles.id JOIN departments ON department_id = departments.id LEFT JOIN employee manager ON employee.manager_id = manager.id",
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.table(result);
      initialPrompt();
    }
  );
};
// TODO: add function/ prompt for add a department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "What is the department name?",
      },
    ])
    .then((answer) => {
      db.query("INSERT INTO departments SET ?", answer);
      console.log("Added new department!");
      viewDepartments();
    });
};
// TODO: add function/ prompt for add a role
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role's title?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "input",
        name: "department_id",
        message: "What is the department id?",
      },
    ])
    .then((role) => {
      db.query("INSERT INTO roles SET ?", role);
      console.log("New role added!");
      viewRoles();
    });
};
// TODO: add function/ prompt for add an employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the role id?",
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the manager id?",
      },
    ])
    .then((employee) => {
      db.query("INSERT INTO employee SET ?", employee);
      console.log("New employee added!");
      viewEmployees();
    });
};

// TODO: add function/ prompt for updating an employee
const updateEmployeeRole = () => {
  db.query(
    `SELECT id AS value, CONCAT(first_name, " ",last_name) AS name FROM employee`,
    (err, employee) => {
      inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            message: "What employee would you like to update?",
            choices: employee,
          },
        ])
        .then((id) => {
          console.log(id);
          db.query(
            `SELECT id AS value, title AS name FROM roles`,
            (err, roles) => {
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "role_id",
                    message: "What is the new role?",
                    choices: roles,
                  },
                ])
                .then((role_id) => {
                  db.query("UPDATE employee SET ? WHERE ?", [role_id, id]);
                })
                .then(viewEmployees);
            }
          );
        });
    }
  );
};

// Initialize application
initialPrompt();

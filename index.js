const inquirer = require("inquirer");

// Connection to mysql2
const db = require("./db/database");

const {
  viewAllDepartments,
  viewBudgetOfAllDepartments,
} = require("./script/department");

const Employee = require("./script/employee");

const viewAllRoles = require("./script/role");

// Function to display a welcome message
function displayWelcomeMessage() {
  console.log(`
  Welcome to...

  ######## ##     ## ########  ##        #######  ##    ## ######## ########    ##     ##    ###    ##    ##    ###     ######   ######## ########
  ##       ###   ### ##     ## ##       ##     ##  ##  ##  ##       ##          ###   ###   ## ##   ###   ##   ## ##   ##    ##  ##       ##     ##
  ##       #### #### ##     ## ##       ##     ##   ####   ##       ##          #### ####  ##   ##  ####  ##  ##   ##  ##        ##       ##     ##
  ######   ## ### ## ########  ##       ##     ##    ##    ######   ######      ## ### ## ##     ## ## ## ## ##     ## ##   #### ######   ########
  ##       ##     ## ##        ##       ##     ##    ##    ##       ##          ##     ## ######### ##  #### ######### ##    ##  ##       ##   ##
  ##       ##     ## ##        ##       ##     ##    ##    ##       ##          ##     ## ##     ## ##   ### ##     ## ##    ##  ##       ##    ##
  ######## ##     ## ##        ########  #######     ##    ######## ########    ##     ## ##     ## ##    ## ##     ##  ######   ######## ##     ##
  `);
}

// Function to start the application
function startApplication() {
  displayWelcomeMessage();

  const employee = new Employee();

  inquirer
    .prompt([
      {
        type: "list",
        name: "dashboard",
        message: "Choose an option:",
        choices: [
          "View All Employees",
          "View Employees by Department",
          "View Employees by Manager",
          "View All Departments",
          "View All Roles",
          "View Budget of All Departments",
          // "Add a Department",
          // "Add a Role",
          // "Update an Employee Role",
          // "Update Employee Manager",
          // "Delete Department",
          // "Delete Role",
          // "Delete Employee",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.dashboard) {
        case "View All Employees":
          employee.viewAll()
          break;
        case "View Employees by Department":
          employee.fetchDepartments((err, departmentNames) => {
            if (err) {
              console.error("Error fetching departments:", err);
            } else {
              inquirer
                .prompt({
                  type: "list",
                  name: "department",
                  message: "Select a department:",
                  choices: departmentNames,
                })
                .then((departmentAnswers) => {
                  const selectedDepartment = departmentAnswers.department;
                  // Use selectedDepartment for further processing
                });
            }
          });
          break;
        case "View Employees by Manager":
          inquirer
            .prompt({
              type: "list",
              name: "manager",
              message: "Select a manager:",
              choices: managerNames,
            })
            .then((managerAnswer) => {
              const selectedManager = managerAnswer.manager;
            });
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View Budget of All Departments":
          viewBudgetOfAllDepartments();
          break;
        case "Quit":
          console.log("🙂 Goodbye!");
          db.close();
          break;
      }
    });
}

startApplication();

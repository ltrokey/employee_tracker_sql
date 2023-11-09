const inquirer = require("inquirer");

// Connection to mysql2
const db = require("./db/database");

const Department = require("./script/department");

const Employee = require("./script/employee");

const Role = require("./script/role");

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

  const department = new Department();
  const employee = new Employee();
  const role = new Role();

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
          employee.viewAll();
          break;

        case "View Employees by Department":
          // Fetch department names and display the prompt
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

                  // Fetch and display employees for the selected department
                  employee.viewByDepartment(
                    selectedDepartment,
                    (err, employees) => {
                      if (err) {
                        console.error(
                          "Error fetching employees by department:",
                          err
                        );
                      } else {
                        console.table(employees);
                      }
                    }
                  );
                });
            }
          });
          break;

        case "View Employees by Manager":
          // Fetch managers names and display the prompt
          employee.fetchManagers((err, managerNames) => {
            if (err) {
              console.error("Error fetching managers:", err);
            } else {
              inquirer
                .prompt({
                  type: "list",
                  name: "manager",
                  message: "Select a manager:",
                  choices: managerNames,
                })
                .then((managerAnswer) => {
                  const selectedManager = managerAnswer.manager;

                  // Fetch and display employees for the selected manager
                  employee.viewByManager(selectedManager, (err, employees) => {
                    if (err) {
                      console.error(
                        "Error fetching employees by manager:",
                        err
                      );
                    } else {
                      console.table(employees);
                    }
                  });
                });
            }
          });
          break;

        case "View All Departments":
          department.viewAll();
          break;

        case "View All Roles":
          role.viewAll();
          break;

        case "View Budget of All Departments":
          department.viewBudget();
          break;

        case "Quit":
          console.log("🙂 Goodbye!");
          db.close();
          break;
      }
    });
}

startApplication();

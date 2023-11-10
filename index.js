const inquirer = require("inquirer");

// MySQL Connection
const db = require("./config/connection");

// Script Files
const Department = require("./script/department");
const Employee = require("./script/employee");
const Role = require("./script/role");

//Prompt Files
const departmentPrompt = require("./prompt_lib/view_emp_by_dept")
const managerPrompt = require("./prompt_lib/view_emp_by_manager")
const addDepartmentPrompt = require("./prompt_lib/add_dept")
const deleteEmployeePrompt = require("./prompt_lib/delete_emp")
const deleteDepartmentPrompt = require("./prompt_lib/delete_dept")
const addEmployeePrompt = require("./prompt_lib/add_emp")
const updateEmployeeManagerPrompt = require("./prompt_lib/update_emp_manager")
const addRolePrompt = require("./prompt_lib/add_role")
const updateEmployeeRolePrompt = require("./prompt_lib/update_emp_role")
const deleteRolePrompt = require("./prompt_lib/delete_role")

const department = new Department();
const employee = new Employee();
const role = new Role();

function displayWelcomeMessage() {
  console.log(`
  Welcome to...
  _______  __   __  _______  ___      _______  __   __  _______  _______
  |       ||  |_|  ||       ||   |    |       ||  | |  ||       ||       |
  |    ___||       ||    _  ||   |    |   _   ||  |_|  ||    ___||    ___|
  |   |___ |       ||   |_| ||   |    |  | |  ||       ||   |___ |   |___
  |    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|
  |   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___
  |_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|
       __   __  _______  __    _  _______  _______  _______  ______
      |  |_|  ||   _   ||  |  | ||   _   ||       ||       ||    _ |
      |       ||  |_|  ||   |_| ||  |_|  ||    ___||    ___||   | ||
      |       ||       ||       ||       ||   | __ |   |___ |   |_||
      |       ||       ||  _    ||       ||   ||  ||    ___||    __ |
      | ||_|| ||   _   || | |   ||   _   ||   |_| ||   |___ |   |  ||
      |_|   |_||__| |__||_|  |__||__| |__||_______||_______||___|  ||

  `);
}

function startApplication() {
  displayWelcomeMessage();
  displayMenu();
}

function displayMenu() {
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
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "Update Employee Manager",
          "Delete Department",
          "Delete Role",
          "Delete Employee",
          "Quit",
        ],
      },
    ])
    .then(handleMenuChoice);
}

function handleMenuChoice(answer) {
  switch (answer.dashboard) {
    case "View All Employees":
      employee.viewAll(() => displayMenu());
      break;
    case "View Employees by Department":
      departmentPrompt(department, employee, () => displayMenu());
      break;
    case "View Employees by Manager":
      managerPrompt(employee, () => displayMenu());
      break;
    case "View All Departments":
      department.viewAll(() => displayMenu());
      break;
    case "View All Roles":
      role.viewAll(() => displayMenu());
      break;
    case "View Budget of All Departments":
      department.viewBudget(() => displayMenu());
      break;
    case "Add a Department":
      addDepartmentPrompt(department, () => displayMenu());
      break;
    case "Add a Role":
      addRolePrompt(role, department, () => displayMenu());
      break;
    case "Add an Employee":
      addEmployeePrompt(department, employee, role, () => displayMenu());
      break;
    case "Update an Employee Role":
      updateEmployeeRolePrompt(employee, role, () => displayMenu());
      break;
    case "Update Employee Manager":
      updateEmployeeManagerPrompt(employee, () => displayMenu());
      break;
    case "Delete Department":
      deleteDepartmentPrompt(department, () => displayMenu());
      break;
    case "Delete Role":
      deleteRolePrompt(role, () => displayMenu());
      break;
    case "Delete Employee":
      deleteEmployeePrompt(department, employee, () => displayMenu());
      break;
    case "Quit":
      console.log("🙂 Goodbye!");
      db.close();
      break;
  }
}

startApplication();

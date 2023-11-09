const inquirer = require("inquirer");
const db = require("./db/database");
const Department = require("./script/department");
const Employee = require("./script/employee");
const Role = require("./script/role");

const department = new Department();
const employee = new Employee();
const role = new Role();

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
      // Update Role logic
      break;
    case "Update Employee Manager":
      updateEmployeeManagerPrompt(employee, () => displayMenu());
      break;
    case "Delete Department":
      deleteDepartmentPrompt(department, () => displayMenu());
      break;
    case "Delete Role":
      // Delete Role logic
      break;
    case "Delete Employee":
      deleteEmployeePrompt(department, employee, () => displayMenu());
      break;
    case "Quit":
      console.log("🙂 Goodbye!");
      db.close();
      break;
  }

  function departmentPrompt(department, employee, callback) {
    department.fetchDepartments((err, departmentNames) => {
      if (err) {
        console.error("Error fetching departments:", err);
        callback();
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
            employee.viewByDepartment(selectedDepartment, (err, employees) => {
              if (err) {
                console.error("Error fetching employees by department:", err);
              } else {
                console.table(employees);
                if (callback) {
                  callback();
                }
              }
            });
          });
      }
    });
  }

  function managerPrompt(employee, callback) {
    employee.fetchManagers((err, managerNames) => {
      if (err) {
        console.error("Error fetching managers:", err);
        callback();
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

            employee.viewByManager(selectedManager, (err, employees) => {
              if (err) {
                console.error("Error fetching employees by manager:", err);
              } else {
                console.table(employees);
                if (callback) {
                  callback();
                }
              }
            });
          });
      }
    });
  }

  function addDepartmentPrompt(department, callback) {
    inquirer
      .prompt({
        type: "input",
        name: "addDepartment",
        message: "Enter New Department Name:",
        validate: (input) => {
          return input.trim() === ""
            ? "Invalid entry, please enter a department name."
            : true;
        },
      })
      .then((departmentAnswer) => {
        const newDepartmentName = departmentAnswer.addDepartment;
        department.addDepartments(newDepartmentName, () => {
          department.viewAll(callback);
          console.log(`Department '${newDepartmentName}' added successfully.`);
        });
      });
  }

  function deleteDepartmentPrompt(department, callback) {
    department.fetchDepartments((err, departmentNames) => {
      if (err) {
        console.error("Error fetching departments:", err);
        callback();
      } else {
        inquirer
          .prompt({
            type: "list",
            name: "department",
            message: "Select a department to delete:",
            choices: departmentNames,
          })
          .then((departmentAnswers) => {
            const selectedDepartment = departmentAnswers.department;
            department.deleteDepartment(selectedDepartment, (err, results) => {
              if (err) {
                console.error("Error deleting department:", err);
              } else {
                department.viewAll(callback);
              }
            });
          });
      }
    });
  }

  function deleteEmployeePrompt(department, employee, callback) {
    department.fetchDepartments((err, departmentNames) => {
      if (err) {
        console.error("Error fetching departments:", err);
        callback();
      } else {
        inquirer
          .prompt({
            type: "list",
            name: "selectedDepartment",
            message: "Select a department to view employees:",
            choices: departmentNames,
          })
          .then((departmentAnswers) => {
            const selectedDepartment = departmentAnswers.selectedDepartment;

            employee.fetchEmployeesByDepartment(
              selectedDepartment,
              (err, employeeNames) => {
                if (err) {
                  console.error("Error fetching employees:", err);
                  callback();
                } else {
                  inquirer
                    .prompt({
                      type: "list",
                      name: "selectedEmployee",
                      message: "Select an employee to delete:",
                      choices: employeeNames,
                    })
                    .then((employeeAnswers) => {
                      const selectedEmployee = employeeAnswers.selectedEmployee;

                      employee.deleteEmployee(
                        selectedEmployee,
                        (err, results) => {
                          if (err) {
                            console.error("Error deleting employee:", err);
                          } else {
                            console.log(
                              `Employee '${selectedEmployee}' successfully deleted.`
                            );
                          }
                          callback();
                        }
                      );
                    });
                }
              }
            );
          });
      }
    });
  }

  function addEmployeePrompt(department, employee, role, callback) {
    department.fetchAllDepartments((err, departments) => {
      if (err) {
        console.error("Error fetching departments:", err);
        callback();
      } else {
        employee.fetchAllManagers((err, managers) => {
          if (err) {
            console.error("Error fetching managers:", err);
            callback();
          } else {
            role.fetchAllRoles((err, roles) => {
              if (err) {
                console.error("Error fetching roles:", err);
                callback();
              } else {
                inquirer
                  .prompt([
                    {
                      type: "input",
                      name: "firstName",
                      message: "Enter the first name of the new employee:",
                    },
                    {
                      type: "input",
                      name: "lastName",
                      message: "Enter the last name of the new employee:",
                    },
                    {
                      type: "list",
                      name: "selectedRole",
                      message: "Select a role for the new employee:",
                      choices: roles.map((role) => role.title),
                    },
                    {
                      type: "list",
                      name: "selectedManager",
                      message: "Select a manager for the new employee:",
                      choices: managers.map(
                        (manager) =>
                          manager.first_name + " " + manager.last_name
                      ),
                    },
                  ])
                  .then((answers) => {
                    const {
                      firstName,
                      lastName,
                      selectedRole,
                      selectedManager,
                    } = answers;

                    const selectedDepartment = roles.find(
                      (role) => role.title === selectedRole
                    ).department_name;

                    const employeeInfo = {
                      firstName,
                      lastName,
                      role: selectedRole,
                      manager: selectedManager,
                    };

                    console.log("New employee information:", employeeInfo);

                    employee.addEmployee(employeeInfo, (err, results) => {
                      if (err) {
                        console.error("Error adding employee:", err);
                      } else {
                        console.log("Employee added successfully.");
                      }
                      callback();
                    });
                  });
              }
            });
          }
        });
      }
    });
  }

  function updateEmployeeManagerPrompt(employee, callback) {
    employee.fetchAllEmployees((err, employeeNames) => {
      if (err) {
        console.error("Error fetching employees:", err);
        callback();
      } else {
        employee.fetchManagers((managerErr, managerNames) => {
          if (managerErr) {
            console.error("Error fetching managers:", managerErr);
            callback();
          } else {
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "selectedEmployee",
                  message: "Select an employee to update manager:",
                  choices: employeeNames,
                },
                {
                  type: "list",
                  name: "newManager",
                  message: "Select a new manager for the employee:",
                  choices: managerNames,
                },
              ])
              .then((answers) => {
                const selectedEmployee = answers.selectedEmployee;
                const newManager = answers.newManager;

                employee.updateEmployeeManager(
                  selectedEmployee,
                  newManager,
                  (err, results) => {
                    if (err) {
                      console.error("Error updating employee manager:", err);
                    } else {
                      console.log("Employee manager updated successfully.");
                    }
                    callback();
                  }
                );
              });
          }
        });
      }
    });
  }

  function addRolePrompt(role, department, callback) {
    department.fetchDepartments((err, departmentNames) => {
      if (err) {
        console.error("Error fetching departments:", err);
        callback();
      } else {
        inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message: "Enter the title of the new role:",
            },
            {
              type: "input",
              name: "salary",
              message: "Enter the salary for the new role:",
              validate: (input) => {
                const isValid = !isNaN(parseFloat(input)) && isFinite(input);
                return isValid ? true : "Please enter a valid number for salary.";
              },
            },
            {
              type: "list",
              name: "selectedDepartment",
              message: "Select a department for the new role:",
              choices: departmentNames,
            },
          ])
          .then((answers) => {
            const { title, salary, selectedDepartment } = answers;

            department.fetchDepartmentIdByName(
              selectedDepartment,
              (departmentIdErr, departmentId) => {
                if (departmentIdErr) {
                  console.error("Error fetching department ID:", departmentIdErr);
                  callback();
                } else {
                  role.addRole({ title, salary, departmentId }, (addRoleErr) => {
                    if (addRoleErr) {
                      console.error("Error adding role:", addRoleErr);
                    } else {
                      console.log("Role added successfully.");
                    }
                    callback();
                  });
                }
              }
            );
          });
      }
    });
  }
}



startApplication();

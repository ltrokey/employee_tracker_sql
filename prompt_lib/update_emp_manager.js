const inquirer = require("inquirer");

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
                      console.log(`

                      Employee manager updated successfully.

                      `);
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

  module.exports = updateEmployeeManagerPrompt
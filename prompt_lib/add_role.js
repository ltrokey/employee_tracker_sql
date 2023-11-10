const inquirer = require("inquirer");

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
                return isValid
                  ? true
                  : "Please enter a valid number for salary.";
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
                  console.error(
                    "Error fetching department ID:",
                    departmentIdErr
                  );
                  callback();
                } else {
                  role.addRole(
                    { title, salary, departmentId },
                    (addRoleErr) => {
                      if (addRoleErr) {
                        console.error("Error adding role:", addRoleErr);
                      } else {
                        console.log(`

                        Role added successfully.

                        `);
                      }
                      callback();
                    }
                  );
                }
              }
            );
          });
      }
    });
  }

  module.exports = addRolePrompt
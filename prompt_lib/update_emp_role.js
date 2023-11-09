const inquirer = require("inquirer");

function updateEmployeeRolePrompt(employee, role, callback) {
    employee.fetchAllEmployees((err, employeeNames) => {
      if (err) {
        console.error("Error fetching employees:", err);
        callback();
      } else {
        role.fetchAllRoles((roleErr, roles) => {
          if (roleErr) {
            console.error("Error fetching roles:", roleErr);
            callback();
          } else {
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "selectedEmployee",
                  message: "Select an employee to update role:",
                  choices: employeeNames,
                },
                {
                  type: "list",
                  name: "selectedRole",
                  message: "Select a new role for the employee:",
                  choices: roles.map((role) => role.title),
                },
              ])
              .then((answers) => {
                const selectedEmployee = answers.selectedEmployee;
                const selectedRole = answers.selectedRole;

                role.fetchRoleByTitle(
                  selectedRole,
                  (roleFetchErr, roleDetails) => {
                    if (roleFetchErr) {
                      console.error(
                        "Error fetching role details:",
                        roleFetchErr
                      );
                      callback();
                    } else {
                      const roleId = roleDetails.id;

                      role.updateEmployeeRole(
                        selectedEmployee,
                        roleId,
                        (updateErr, updateResults) => {
                          if (updateErr) {
                            console.error(
                              "Error updating employee role:",
                              updateErr
                            );
                          } else {
                            console.log(`

                            Employee role updated successfully.

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
    });
  }

  module.exports = updateEmployeeRolePrompt
const inquirer = require("inquirer");

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
                        console.log(`

                        Employee added successfully.

                        `);
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

  module.exports = addEmployeePrompt
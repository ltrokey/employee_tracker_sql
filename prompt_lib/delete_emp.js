const inquirer = require("inquirer");

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
                            console.log(`

                            Employee '${selectedEmployee}' successfully deleted.

                            `
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

  module.exports = deleteEmployeePrompt
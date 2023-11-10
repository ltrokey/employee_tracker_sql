const inquirer = require("inquirer");

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

  module.exports = departmentPrompt
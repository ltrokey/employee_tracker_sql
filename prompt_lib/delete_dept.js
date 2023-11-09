const inquirer = require("inquirer");

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
                console.log(`

                Department '${departmentName}' successfully deleted.

                `
                );
              }
            });
          });
      }
    });
  }

  module.exports = deleteDepartmentPrompt
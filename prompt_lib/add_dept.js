const inquirer = require("inquirer");

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
          console.log(`

          Department '${newDepartmentName}' added successfully.

          `);
        });
      });
  }

  module.exports = addDepartmentPrompt
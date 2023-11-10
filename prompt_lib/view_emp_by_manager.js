const inquirer = require("inquirer");

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

  module.exports = managerPrompt
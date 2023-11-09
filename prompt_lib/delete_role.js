const inquirer = require("inquirer");

function deleteRolePrompt(role, callback) {
    role.fetchAllRoles((err, roles) => {
      if (err) {
        console.error("Error fetching roles:", err);
        callback();
      } else {
        inquirer
          .prompt([
            {
              type: "list",
              name: "selectedRole",
              message: "Select a role to delete:",
              choices: roles.map((role) => role.title),
            },
          ])
          .then((answers) => {
            const selectedRole = answers.selectedRole;

            role.deleteRole(selectedRole, (deleteErr, deleteResults) => {
              if (deleteErr) {
                console.error("Error deleting role:", deleteErr);
              } else {
                console.log(`

                Role deleted successfully.

                `);
              }
              callback();
            });
          });
      }
    });
  }

  module.exports = deleteRolePrompt
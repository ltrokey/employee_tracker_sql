const db = require("../db/database");

// Function to get all departments
function viewAllDepartments() {
  const query = `
    SELECT
        d.id AS "Department ID",
        d.department_name AS "Department Name"
    FROM department AS d;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(results);
  });
}

module.exports = {
  viewAllDepartments,
};

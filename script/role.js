const db = require("../db/database");

class Role {
  constructor() {}

  viewAll(callback) {
    const query = `
    SELECT
        r.id AS "Title ID",
        d.department_name AS "Department",
        r.title AS "Title",
        CONCAT('$', FORMAT(r.salary, 2)) AS "Salary"
    FROM role AS r
    LEFT JOIN department AS d ON r.department_id = d.id;
`;
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      console.table(results);
      if (callback) {
        callback();
      }
    });
  }

  addRole() {
    // write code
  }

  updateRole() {
    // write code
  }

  deleteRole() {
    // write code
  }
}

module.exports = Role;

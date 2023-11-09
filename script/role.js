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

  fetchAllRoles(callback) {
    const query = "SELECT * FROM role";
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }

  addRole({ title, salary, departmentId }, callback) {
    const addRoleQuery =
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
    const values = [title, salary, departmentId];

    db.query(addRoleQuery, values, (err, results) => {
      if (err) {
        console.error("Error adding role:", err);
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }
  updateRole() {
    // write code
  }

  deleteRole() {
    // write code
  }
}

module.exports = Role;

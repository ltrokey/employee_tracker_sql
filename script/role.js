const db = require("../config/connection");

class Role {
  constructor() {}

  viewAll(callback) {
    const query = `
    SELECT
        r.id AS "Title ID",
        r.title AS "Title",
        d.department_name AS "Department",
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

  fetchRoleByTitle(title, callback) {
    const query = "SELECT * FROM role WHERE title = ?";
    db.query(query, [title], (err, results) => {
      if (err) {
        console.error("Error fetching role by title:", err);
        callback(err, null);
      } else {
        if (results.length === 0) {
          console.error("Role not found.");
          callback("Role not found.", null);
        } else {
          const roleDetails = results[0];
          callback(null, roleDetails);
        }
      }
    });
  }

  updateEmployeeRole(employeeName, roleId, callback) {
    const updateQuery =
      "UPDATE employee SET role_id = ? WHERE CONCAT(first_name, ' ', last_name) = ?";
    db.query(
      updateQuery,
      [roleId, employeeName],
      (updateErr, updateResults) => {
        if (updateErr) {
          console.error("Error updating employee role:", updateErr);
          callback(updateErr);
        } else {
          callback(null, updateResults);
        }
      }
    );
  }

  deleteRole(roleTitle, callback) {
    const deleteQuery = "DELETE FROM role WHERE title = ?";
    db.query(deleteQuery, [roleTitle], (deleteErr, deleteResults) => {
      if (deleteErr) {
        console.error("Error deleting role:", deleteErr);
        callback(deleteErr);
      } else {
        callback(null, deleteResults);
      }
    });
  }
}

module.exports = Role;

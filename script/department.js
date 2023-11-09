const db = require("../db/database");

class Department {
  constructor() {}

  viewAll(callback) {
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
      if (callback) {
        callback();
      }
    });
  }

  fetchDepartmentIdByName(departmentName, callback) {
    const findDepartmentIdQuery = `
      SELECT id FROM department WHERE department_name = ?;
    `;

    db.query(findDepartmentIdQuery, [departmentName], (err, results) => {
      if (err) {
        console.error("Error fetching department ID:", err);
        callback(err, null);
      } else {
        if (results.length === 0) {
          console.error("Department not found.");
          callback("Department not found.", null);
        } else {
          const departmentId = results[0].id;
          callback(null, departmentId);
        }
      }
    });
  }

  fetchAllDepartments(callback) {
    const query = "SELECT * FROM department";
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }

  fetchDepartments(callback) {
    const query = "SELECT department_name FROM department";
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        const departmentNames = results.map((result) => result.department_name);
        callback(null, departmentNames);
      }
    });
  }

  viewBudget(callback) {
    const query = `
    SELECT
    IFNULL(department.department_name, 'Grand Total') AS "Department",
    CONCAT('$', FORMAT(SUM(role.salary), 2)) AS "Total Salaries"
    FROM department
    JOIN role ON department.id = role.department_id
    GROUP BY department.department_name WITH ROLLUP;
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

  addDepartments(newDepartmentName, callback) {
    const query = "INSERT INTO department (department_name) VALUES (?);";
    db.query(query, [newDepartmentName], (err, results) => {
      if (err) {
        console.error(err);
      } else {
        callback(null, results);
      }
    });
  }

  deleteDepartment(departmentName, callback) {
    const findDepartmentId =
      "SELECT id FROM department WHERE department_name = ?";
    db.query(
      findDepartmentId,
      [departmentName],
      (findDepartmentIdErr, findDepartmentIdResults) => {
        if (findDepartmentIdErr) {
          console.error(findDepartmentIdErr);
          callback(findDepartmentIdErr);
        } else {
          const departmentId = findDepartmentIdResults[0].id;

          const deleteQuery = "DELETE FROM department WHERE id = ?";
          db.query(deleteQuery, [departmentId], (deleteErr, deleteResults) => {
            if (deleteErr) {
              console.error(deleteErr);
              callback(deleteErr);
            } else {
              console.log(
                `Department '${departmentName}' successfully deleted.`
              );
              callback(null, deleteResults);
            }
          });
        }
      }
    );
  }
}

module.exports = Department;

const db = require("../db/database");

class Department {
  constructor() {}

  viewAll() {
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

  viewBudget() {
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
    });
  }

  addDepartment() {
    //write code
  }

  deleteDepartment() {
    //write code
  }

  updateDepartment() {
    //write code
  }

}

module.exports = Department;

const db = require("../db/database");

// Function to view all employees

class Employee {
  constructor() {}

  viewAll() {
    const query = `
    SELECT
        e.id AS "Employee ID",
        e.first_name AS "First Name",
        e.last_name AS "Last Name",
        r.title AS "Title",
        d.department_name AS "Department",
        CONCAT('$', FORMAT(r.salary, 2)) AS "Salary",
        CONCAT(m.first_name, ' ', m.last_name) AS "Manager"
    FROM employee AS e
    LEFT JOIN role AS r ON e.role_id = r.id
    LEFT JOIN department AS d ON r.department_id = d.id
    LEFT JOIN employee AS m ON e.manager_id = m.id;
`;
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      console.table(results);
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

  viewByDepartment(selectedDepartment, callback) {
    const query = `
      SELECT
        e.id AS "Employee ID",
        e.first_name AS "First Name",
        e.last_name AS "Last Name",
        r.title AS "Title",
        CONCAT('$', FORMAT(r.salary, 2)) AS "Salary"
      FROM employee AS e
      LEFT JOIN role AS r ON e.role_id = r.id
      WHERE r.department_id = (
        SELECT id FROM department WHERE department_name = ?
      );`;

    db.query(query, [selectedDepartment], (err, results) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }

  fetchManagers(callback) {
    const query = `SELECT CONCAT(first_name, ' ', last_name)
                  AS manager_name FROM employee
                  WHERE manager_id IS NULL`;
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        const managerNames = results.map((result) =>
        result.manager_name);
        callback(null, managerNames);
      }
    });
  }

  viewByManager(selectedManager, callback) {
    const query = `
      SELECT
        e.id AS "Employee ID",
        e.first_name AS "First Name",
        e.last_name AS "Last Name",
        r.title AS "Title",
      CONCAT('$', FORMAT(r.salary, 2)) AS "Salary"
      FROM employee AS e
      LEFT JOIN role AS r ON e.role_id = r.id
      LEFT JOIN employee AS m ON e.manager_id = m.id
      WHERE CONCAT(m.first_name, ' ', m.last_name) = ?`;

    db.query(query, [selectedManager], (err, results) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }

  addEmployee() {
    //write code
  }

  updateEmployeeManager() {
    //write code
  }

  deleteEmployee() {
    //write code
  }
}

module.exports = Employee;

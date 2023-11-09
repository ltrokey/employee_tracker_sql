const db = require("../db/database");

class Employee {
  constructor() {}

  viewAll(callback) {
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
      if (callback) {
        callback();
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

  fetchAllManagers(callback) {
    const query = "SELECT * FROM employee WHERE manager_id IS NULL";
    db.query(query, (err, results) => {
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
        const managerNames = results.map((result) => result.manager_name);
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

  fetchEmployeesByDepartment(departmentName, callback) {
    const query = `
      SELECT CONCAT(first_name, ' ', last_name) AS fullName
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      WHERE department.department_name = ?;
    `;

    db.query(query, [departmentName], (err, results) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        const employeeNames = results.map((employee) => employee.fullName);
        callback(null, employeeNames);
      }
    });
  }

  addEmployee(employeeInfo, callback) {
    const { firstName, lastName, role, manager } = employeeInfo;

    const findRoleIdQuery = `
      SELECT id FROM role WHERE title = ?;
    `;

    db.query(findRoleIdQuery, [role], (findRoleErr, findRoleResults) => {
      if (findRoleErr) {
        console.error("Error finding role ID:", findRoleErr);
        callback(findRoleErr);
      } else {
        if (findRoleResults.length === 0) {
          console.error("Role not found.");
          callback("Role not found.");
        } else {
          const roleId = findRoleResults[0].id;

          const findManagerIdQuery = `
            SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?;
          `;

          db.query(
            findManagerIdQuery,
            [manager],
            (findManagerErr, findManagerResults) => {
              if (findManagerErr) {
                console.error("Error finding manager ID:", findManagerErr);
                callback(findManagerErr);
              } else {
                const managerId =
                  findManagerResults.length > 0
                    ? findManagerResults[0].id
                    : null;

                const insertEmployeeQuery = `
                INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?);
              `;

                db.query(
                  insertEmployeeQuery,
                  [firstName, lastName, roleId, managerId],
                  (insertErr, insertResults) => {
                    if (insertErr) {
                      console.error("Error adding employee:", insertErr);
                      callback(insertErr);
                    } else {
                      callback(null, insertResults);
                    }
                  }
                );
              }
            }
          );
        }
      }
    });
  }

  updateEmployeeManager(employeeName, newManagerName, callback) {
    const fetchEmployeeIdQuery = `
      SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?;
    `;

    db.query(
      fetchEmployeeIdQuery,
      [employeeName],
      (fetchEmployeeIdErr, fetchEmployeeIdResults) => {
        if (fetchEmployeeIdErr) {
          console.error("Error fetching employee ID:", fetchEmployeeIdErr);
          callback(fetchEmployeeIdErr);
        } else {
          const employeeId =
            fetchEmployeeIdResults.length > 0
              ? fetchEmployeeIdResults[0].id
              : null;

          const fetchNewManagerIdQuery = `
          SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?;
        `;

          db.query(
            fetchNewManagerIdQuery,
            [newManagerName],
            (fetchNewManagerIdErr, fetchNewManagerIdResults) => {
              if (fetchNewManagerIdErr) {
                console.error(
                  "Error fetching new manager ID:",
                  fetchNewManagerIdErr
                );
                callback(fetchNewManagerIdErr);
              } else {
                const newManagerId =
                  fetchNewManagerIdResults.length > 0
                    ? fetchNewManagerIdResults[0].id
                    : null;

                const updateManagerQuery = `
              UPDATE employee
              SET manager_id = ?
              WHERE id = ?;
            `;

                db.query(
                  updateManagerQuery,
                  [newManagerId, employeeId],
                  (updateManagerErr, updateManagerResults) => {
                    if (updateManagerErr) {
                      console.error(
                        "Error updating employee manager:",
                        updateManagerErr
                      );
                      callback(updateManagerErr);
                    } else {
                      callback(null, updateManagerResults);
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }

  deleteEmployee(selectedEmployee, callback) {
    const [firstName, lastName] = selectedEmployee.split(" ");

    const findEmployeeIdQuery = `
      SELECT id FROM employee WHERE first_name = ? AND last_name = ?;
    `;

    db.query(
      findEmployeeIdQuery,
      [firstName, lastName],
      (findErr, findResults) => {
        if (findErr) {
          console.error("Error finding employee ID:", findErr);
          callback(findErr);
        } else {
          if (findResults.length === 0) {
            console.error("Employee not found.");
            callback("Employee not found.");
          } else {
            const employeeId = findResults[0].id;

            const deleteQuery = `
            DELETE FROM employee WHERE id = ?;
          `;

            db.query(deleteQuery, [employeeId], (deleteErr, deleteResults) => {
              if (deleteErr) {
                console.error("Error deleting employee:", deleteErr);
                callback(deleteErr);
              } else {
                callback(null, deleteResults);
              }
            });
          }
        }
      }
    );
  }

  fetchAllEmployees(callback) {
    const fetchAllEmployeesQuery = `
      SELECT CONCAT(first_name, ' ', last_name) AS employee_name
      FROM employee;
    `;

    db.query(
      fetchAllEmployeesQuery,
      (fetchAllEmployeesErr, fetchAllEmployeesResults) => {
        if (fetchAllEmployeesErr) {
          console.error("Error fetching all employees:", fetchAllEmployeesErr);
          callback(fetchAllEmployeesErr, null);
        } else {
          const employeeNames = fetchAllEmployeesResults.map(
            (employee) => employee.employee_name
          );
          callback(null, employeeNames);
        }
      }
    );
  }
}

module.exports = Employee;

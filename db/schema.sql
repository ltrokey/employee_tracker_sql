-- Drop the database if it exists
DROP DATABASE IF EXISTS company_db;

-- Create the database
CREATE DATABASE company_db;

-- Use the database
USE company_db;

-- Create the department table
CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(100),
    PRIMARY KEY (id)
);

-- Create the role table
CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) DEFAULT 0.00 CHECK (salary >= 0),
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id),
    INDEX (department_id)
);

-- Create the employee table
CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
    INDEX (role_id),
    INDEX (manager_id),
    UNIQUE (first_name, last_name) -- Constraint, no duplicates
);


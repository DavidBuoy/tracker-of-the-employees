DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR (100) NOT NULL,
  employee_role INT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  salary DECIMAL (10) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO employee (first_name, last_name, employee_role) values ("David", "Bushard", 1);
INSERT INTO role (title, salary, department_id) values ("Junior", "60000", 1);
INSERT INTO department (department_name) values ("Front End Develpoment")


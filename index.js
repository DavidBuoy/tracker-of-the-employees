const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'root',
  database: 'tracker_db',
});

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  start();
});

// function which prompts the user for what action they should take
const start = () => {
  inquirer
    .prompt({
      name: 'startingOptions',
      type: 'rawlist',
      message: 'WELCOME TO EMPLOYEE TRACKER!',
      choices: ['Add New Employee', 'View Employees Info', 'Add Role', 'Add Department', 'Edit Employee Info', 'EXIT'],
    })
    .then((answer) => {
      // Couldn't get my switch case to work. :(
  // ---------------------------------------------
      // switch (answers.startingOptions) {
      //   case 'Add New Employee':
      //     addNewEmployee();
      //     break;

      //   case 'View Employees Info':
      //     viewEmployee();
      //     break;

      // //   case 'Edit Employee Info':
      // //     editEmployee();
      // //     break;

      //   case 'EXIT':
      //     connection.end();
      //     break;

      //   default:
      //     console.log(`Invalid action: ${answer.startingOptions}`);
      //     break;
      // }

  // ---------------------------------------------
      // If else statement that switches through the first inquirer.
      if (answer.startingOptions === 'Add New Employee') {
        addNewEmployee();
      } else if (answer.startingOptions === 'View Employees Info') {  viewEmployee();
      } else if (answer.startingOptions === 'Add Role') {
        addRole();
      } else if (answer.startingOptions === 'Add Department') {
        addDepartment();
        
      } else if (answer.startingOptions === 'Edit Employee Info') {
        editEmployee();
   
      } else {
        connection.end();
      }

  // ---------------------------------------------
    });
};
// CRUD this is the "C" CREATING THE INFORMATION!

// Pretty sure that I need a JOIN or JOIN LEFT to get the tables to not print up a bunch of info.

// function to handle adding new employees to the tracker_db
const addNewEmployee = () => {
  // Inquirer question promt for adding new employees
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'Enter Your First Name',
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'Enter Your Last Name',
      },
      {
        name: 'title',
        type: 'list',
        message: 'What is the Title of the Employee?',
        choices: ["Junior", "Senior", "Intern"]
      },
      {
        name: 'role',
        type: 'list',
        message: 'What is the role of the Employee?',
        choices: ["1 Developer", "2 Designer", "3 Manager", "4 Total Bad Ass", "5 TEST"]
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the Employees Salary? NUMBERS ONLY',
      },
      {
        name: 'department',
        type: 'list',
        message: 'What is the Department the employee works in?',
        choices:["Front End Web Development", "Front End Back End", "Designer", "Project Manager"]
      },
      
    ])
    .then((answer) => {

// ---------------- THIS IS USING THE EMPLOYEE TABLE

      // when finished prompting, insert a new item into the db with that info
      // THIS IS THE CONNECTION TO THE db
var roleID = answer.role.split(" ")[0]
console.log(roleID);

      
      connection.query(
        'INSERT INTO employee SET ?',
        {
          // Pretty sure this is the body stuff DAN was talking about in week 13.
          first_name: answer.firstName,
          last_name: answer.lastName,
          employee_role: roleID,
        },
        (err) => {
          if (err) throw err;
        }
      );
// ---------------- THIS IS USING THE ROLE TABLE



 
// ---------------- THIS IS USING THE DEPARTMENT TABLE
      // connection.query(
      //   'INSERT INTO department SET ?',
      //   {
      //     // Pretty sure this is the body stuff DAN was talking about on the new week.
      //     department_name: answer.department,
      //   },
      //   (err) => {
      //     if (err) throw err;
      //     console.log('EMPLOYEE WAS ADDED! What would you like to do now?');

      //     // User is being repromted to add a new user.
      //     start();
      //   }
      // );
    });
};
// CRUD the is the "R" Im viewing the information on the terminal.

// It prints all the info from the tracker_db, but it shows mulitpule inputs.
const viewEmployee = () => {
  connection.query('SELECT * FROM employee INNER JOIN role ON employee.employee_role = role.id ', (error, results) => {
    if (error) throw error;

    // Log all results of the SELECT statement
    console.table(results);
    // connection.end();
    start();
  });
};


const addRole = () => {
  // Inquirer question promt for adding new employees
  inquirer
    .prompt([
      
      {
        name: 'title',
        type: 'list',
        message: 'What is the Title of the Employee?',
        choices: ["Junior", "Senior", "Intern"]
      },
   
      {
        name: 'salary',
        type: 'input',
        message: 'What is the Employees Salary? NUMBERS ONLY',
      },
      {
        name: 'department',
        type: 'list',
        message: 'What is the Department the employee works in?',
        choices: ["1 Front End Web Development", "2 Front End Back End", "3 Designer", "4 Project Manager"]
      },

    ])
    .then((answer) => {

      // ---------------- THIS IS USING THE EMPLOYEE TABLE

      // when finished prompting, insert a new item into the db with that info
      // THIS IS THE CONNECTION TO THE db
      var departmentID = answer.department.split(" ")[0]
      console.log(departmentID);


      connection.query(
        'INSERT INTO role SET ?',
        {
          // Pretty sure this is the body stuff DAN was talking about in week 13.
          title: answer.title,
          salary: answer.salary,
          department_id: departmentID,
        },
        (err) => {
          if (err) throw err;
        }
      );
      // ---------------- THIS IS USING THE DEPARTMENT TABLE
      
    });
};


// const editEmployee = () => {
// }







// Remember that I will need to move around the calling of the functions to the correct areas then they are at now.
// Look at the GreatBay activitie should help you line up what i need to do to add more fields. 
// gonna need to do more research on methods. 
// UNIT 11 will have info on how to add seeds. 
// Probably gonna need some CRUD
// CREATE - Need to add a person to the application with information on the employee.
    // ill neeed input fields of first name, last name, role, department, 
// READ - This needed a connection.query and inserted the place to draw from. so on mine i pulled from the whole DB table.
// UPDATE - 
// DELETE -  

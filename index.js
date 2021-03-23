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
      choices: ['Add New Employee', 'View Employees Info', 'Edit Employee Info', 'EXIT'],
    })
    .then((answer) => {

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

      if (answer.startingOptions === 'Add New Employee') {
        addNewEmployee();
      } else if (answer.startingOptions === 'View Employees Info') {
        viewEmployee();
      } else if (answer.startingOptions === 'Edit Employee Info') {
        editEmployee();
      } else {
        connection.end();
      }

  // ---------------------------------------------

    });
};
// CRUD this is the "C" CREATING THE INFORMATION!

// function to handle adding new employees to the DB
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
        name: 'role',
        type: 'list',
        message: 'What is the role of the Employee?',
        choices: ["Developer", "Designer", "Project Manager", "Total Bad Ass"]
      },
      {
        name: 'title',
        type: 'input',
        message: 'What is the Title of the Employee?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the Employees Salary? NUMBERS ONLY',
      },
      {
        name: 'department',
        type: 'input',
        message: 'What is the Department the employee works in?',
      },
      
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        'INSERT INTO employee SET ?',
        {
          // Pretty sure this is the body stuff DAN was talking about on the new week.
          first_name: answer.firstName,
          last_name: answer.lastName,
          employee_role: answer.role
        },
        (err) => {
          if (err) throw err;
        }
      );

      connection.query(
        'INSERT INTO role SET ?',
        {
          // Pretty sure this is the body stuff DAN was talking about on the new week.
          title: answer.title,
          salary: answer.salary,
        },
        (err) => {
          if (err) throw err;
          // User is being repromted to add a new user.
        }
      );

      connection.query(
        'INSERT INTO department SET ?',
        {
          // Pretty sure this is the body stuff DAN was talking about on the new week.
          department_name: answer.department,
        },
        (err) => {
          if (err) throw err;
          console.log('EMPLOYEE WAS ADDED! What would you like to do now?');

          // User is being repromted to add a new user.
          start();
        }
      );
    });
};

// CRUD the is the "R" Im viewing the information on the terminal.


const viewEmployee = () => {
  connection.query('SELECT * FROM employee, role;', (error, results) => {
    if (error) throw error;

    // Log all results of the SELECT statement
    console.table(results);
    // connection.end();
    start();
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

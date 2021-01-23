const { resolveCname } = require('dns');
let mysql = require('mysql');
const user_table = 'user_tbl'

let connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'wjs231100',
  database : 'workout_schedular'
});

connection.connect();

let mySql = {};
mySql.Utils = {};

mySql.Utils.showUserTable = function () {
  let query = "SHOW COLUMNS FROM " + user_table;
  return new Promise ( (resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if(error) {
        return reject(error);
      }
      resolve(results, fields);
    })
  })
}

mySql.Utils.createUser = function (user_email, password) {
  user_email = '"' + user_email + '"'
  password = '"' + password + '"'
  let values = '(' + user_email + ', ' + password + ')';
  let query = "INSERT INTO " + user_table + " (user_email, password)" + " VALUES " + values;

  return new Promise ( (resolve, reject) => {
    connection.query(query,(error, results, fields) => {
      if (error) {
        return reject(error);
      }

      resolve(results, fields);
    })
  })
};

mySql.Utils.deleteUser = function (user_email) {
  user_email = '"' + user_email + '"';
  let query = "DELETE FROM " + user_table + " WHERE user_email = " + user_email;

  return new Promise ( (resolve, reject) => {
    connection.query(query,(error, results, fields) => {
      if (error) {
        return reject(error);
      }

      resolve(results);
    })
  })
}

mySql.Utils.showUserTable().then( (results, fields) => {
  console.log(results);
  // console.log(fields);
});

// mySql.Utils.deleteUser('whow1101@naver.com').then ( value => {
//   console.log(value)
// })
// .catch (err => {
//   console.log(err);
// });

// mySql.Utils.createUser('whow1101@naver.com','1234')
// .then( (results, fields) => {
//   console.log(results);
//   console.log();
//   console.log(fields);
// })
// .catch( err => {
//   console.log(err);
// });

connection.end();

// export default mySql;
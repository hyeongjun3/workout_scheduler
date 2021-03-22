const { resolveCname } = require('dns');
let mysql = require('mysql');
const user_table = 'user_tbl';
const daily_table = 'daily_tbl';

let connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'wjs231100',
  database : 'workout_schedular'
});

connection.connect();

let mySql = {};
mySql.Utils = {};

mySql.Utils.wrapString = function(str) {
  return '"' + str + '"';
}

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

// TODO : 암호화, 이미 가입되어있는지 확인, 이메일 인증
mySql.Utils.createUser = function (user_email, password,verification_code) {
  user_email = '"' + user_email + '"'
  password = '"' + password + '"'
  verification_code = '"' + verification_code + '"'
  let values = '(' + user_email + ', ' + password + ',' + verification_code + ')';
  let query = "INSERT INTO " + user_table + " (user_email, password, verification_code)" + " VALUES " + values;

  return new Promise ( (resolve, reject) => {
    connection.query(query,(error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results, fields);
    })
  })
};

// SELECT * FROM user_tbl WHERE user_email = "whow1101@naver.com"  AND password = "1234" LIMIT 1
mySql.Utils.readUser = function (user_email, password) {
  user_email = '"' + user_email + '"'
  password = '"' + password + '"'
  let query = "SELECT * FROM " + user_table + " WHERE user_email = " + user_email + " AND password = "  + password + " LIMIT 1";
  return new Promise ( (resolve, reject) => {
    connection.query(query,(error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results, fields);
    })
  })
}

mySql.Utils.readUserInfo = function (user_email) {
  user_email = '"' + user_email + '"'
  let query = "SELECT * FROM " + user_table + " WHERE user_email = " + user_email + " LIMIT 1";
  return new Promise ( (resolve, reject) => {
    connection.query(query,(error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results, fields);
    })
  })
}

// TODO : user가 검색 안될 때 처리
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

mySql.Utils.addAdditionalInfo = function (user_email,nickname, gender) {
  user_email = mySql.Utils.wrapString(user_email);
  nickname = mySql.Utils.wrapString(nickname);
  gender = gender === 'male' ? '"M"' : '"F"';

  let query = "UPDATE " + user_table + " SET" +
              " nickname=" + nickname  +
              ", gender=" + gender +
              ", additional_flag=1" +
              " WHERE user_email=" + user_email;
  return new Promise ((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) {
        return reject(error);
      }

      resolve(results);
    });
  })
}

mySql.Utils.checkVerificationCode = function(code) {
  code = mySql.Utils.wrapString(code);

  let query = 'SELECT * FROM ' + user_table + ' WHERE verification_code = ' + code;
  return new Promise ((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  })
}

mySql.Utils.updateValidationFlag = function(code) {
  code = mySql.Utils.wrapString(code);
  // UPDATE user_tbl SET validation_flag = 1 WHERE verification code = ''
  let query = 'UPDATE ' + user_table + ' SET validation_flag = 1 WHERE verification_code = ' + code;

  return new Promise ((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  })
}

mySql.Utils.createDaily = function(user_email, weight, target_time) {
  user_email = mySql.Utils.wrapString(user_email);
  weigt = mySql.Utils.wrapString(weight);
  target_time = mySql.Utils.wrapString(target_time);
  let values = `(${user_email}, ${weight}, ${target_time})`;
  let query = 'INSERT INTO ' + daily_table + ' (user_email, weight, date) VALUES ' +  values;
  console.log(query);
  return new Promise ((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  })
}

mySql.Utils.getDailyInfo = function(user_email, target_year, target_month) {
  user_email = mySql.Utils.wrapString(user_email);
  target_year = mySql.Utils.wrapString(target_year);
  target_month = mySql.Utils.wrapString(target_month);

  let query = `SELECT * FROM ${daily_table} WHERE user_email = ${user_email}
               AND MONTH(date) = ${target_month} AND YEAR(date) = ${target_year} ORDER BY DATE(date)`
  return new Promise ((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  })
}

module.exports.Utils = mySql.Utils;
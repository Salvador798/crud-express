const mysql = require("mysql");
const config = require("../config");

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let conexion;

function conMysql() {
  conexion = mysql.createConnection(dbConfig);

  conexion.connect((err) => {
    if (err) {
      console.log(["DB Error"], err);
      setTimeout(conMysql, 200);
    } else {
      console.log("DB Connect");
    }
  });

  conexion.on("error", (err) => {
    console.log(["DB Error"], err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      conMysql();
    } else {
      throw err;
    }
  });
}

conMysql();

function all(table) {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${table}`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function one(table, id) {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${table} WHERE id=${id}`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function added(table, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`,
      [data, data],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

function deleted(table, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `DELETE FROM ${table} WHERE id = ?`,
      data.id,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

function query(table, consult) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${table} WHERE ?`,
      consult,
      (error, result) => {
        return error ? reject(error) : resolve(result[0]);
      }
    );
  });
}

module.exports = {
  all,
  one,
  added,
  deleted,
  query,
};

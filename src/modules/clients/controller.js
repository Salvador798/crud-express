const table = "clients";
module.exports = function (dbInyection) {
  let db = dbInyection;
  if (!db) {
    db = require("../../DB/mysql");
  }

  function all() {
    return db.all(table);
  }

  function one(id) {
    return db.one(table, id);
  }

  function added(body) {
    return db.added(table, body);
  }

  function deleted(body) {
    return db.deleted(table, body);
  }

  return {
    all,
    one,
    added,
    deleted,
  };
};

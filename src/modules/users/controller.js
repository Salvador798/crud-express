const table = "users";
const auth = require("../auth");
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

  async function added(body) {
    const user = {
      id: body.id,
      name: body.name,
      active: body.active,
    };

    const response = await db.added(table, user);

    var insertId = 0;
    if (body.id == 0) {
      insertId = response.insertId;
    } else {
      insertId = body.id;
    }

    var response2 = "";
    if (body.user || body.password) {
      response2 = await auth.added({
        id: insertId,
        user: body.user,
        password: body.password,
      });
    }

    return response2;
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

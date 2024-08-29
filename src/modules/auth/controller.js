const table = "auth";
const bcrypt = require("bcrypt");
const auth = require("../../auth");

module.exports = function (dbInyection) {
  let db = dbInyection;
  if (!db) {
    db = require("../../DB/mysql");
  }

  async function login(user, password) {
    const data = await db.query(table, { user: user });

    return bcrypt.compare(password, data.password).then((result) => {
      if (result === true) {
        // Generator Token
        return auth.asignToken({ ...data });
      } else {
        throw new Error("Invalidated Information");
      }
    });
  }

  async function added(data) {
    const authData = {
      id: data.id,
    };

    if (data.user) {
      authData.user = data.user;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password.toString(), 5);
    }

    return db.added(table, authData);
  }

  return {
    added,
    login,
  };
};

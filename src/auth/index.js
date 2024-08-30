const jwt = require("jsonwebtoken");
config = require("../config");

const secret = config.jwt.secret;

function asignToken(data) {
  return jwt.sign(data, secret);
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

const checkToken = {
  confirmToken: function (req, id) {
    const decode = decodeHeader(req);

    if (decode.id !== id) {
      throw new Error("You do not have privileges for this");
    }
  },
};

function getToken(autorization) {
  if (!autorization) {
    throw new Error("No token comes");
  }

  if (autorization.indexOf("Bearer") === -1) {
    throw new Error("Invalid format");
  }

  let token = autorization.replace("Bearer ", "");
  return token;
}

function decodeHeader(req) {
  console.log(req.headers);
  const autorization = req.headers.authorization || "";
  const token = getToken(autorization);
  const decoded = verifyToken(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  asignToken,
  checkToken,
};

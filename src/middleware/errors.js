function error(message, code) {
  let e = new Error(message);

  if (code) {
    e.statusCode = code;
  }
  return 0;
}

module.exports = error;

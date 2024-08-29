const app = require("./app");

app.listen(app.get("port"), () => {
  console.log("Server Listening on the port", app.get("port"));
});

const { users, index } = require("./controller");

const routes = (app) => {
  app.route("/").get(index)
  app.route("/users").get(users);
};

module.exports = routes;

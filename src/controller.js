const connection = require("./db");
const { OK, INTERNAL_SERVER_ERROR } = require("./response");

const index = (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log({ success: `sending response from endpoint : / to ${ip}` });
    return OK({ message: "welcome" }, res);
  } catch (error) {
    console.log({ error: `${error.message} - from endpoint : /` });
    return INTERNAL_SERVER_ERROR("internal server error", res);
  }
};

const users = (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const query = `SELECT * FROM users`;

    connection.query(query, (error, rows) => {
      if (error) throw error;
      console.log({
        success: `sending response from endpoint : /users to ${ip}`,
      });
      return OK(rows, res);
    });
  } catch (error) {
    console.log({ error: `${error.message} - from endpoint : /users` });
    return INTERNAL_SERVER_ERROR("internal server error", res);
  }
};

module.exports = { users, index };

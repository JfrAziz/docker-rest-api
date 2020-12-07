require("dotenv").config({ silent: true });

const { PORT, HOST, USER, PASSWORD, DATABASE } = process.env;

module.exports = { PORT, HOST, USER, PASSWORD, DATABASE };

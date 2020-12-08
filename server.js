const routes = require("./src/routes");
const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./src/config");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

app.listen(PORT, () => {
  console.log(`[server] App listening at http://localhost:${PORT}`);
});

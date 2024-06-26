import express from "express";
const app = express();
import db from "./startup/db.js";
import routes from "./startup/routes.js";

db();
routes(app);

const port = 8000;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

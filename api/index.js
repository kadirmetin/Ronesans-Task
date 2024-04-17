require("dotenv").config();

const cors = require("cors");
const express = require("express");
const db = require("./config/database");
const { router } = require("./routes/router");

const app = express();
console.log(process.env.CLIENT_URL);
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

db.authenticate()
  .then(() => console.log("DATABASE connected!"))
  .catch((err) => console.log("Error: ", err));

app.use("/", router);

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

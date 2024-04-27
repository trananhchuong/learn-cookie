const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();


const routes = require("./routes/routes");

app.use(express.urlencoded())

app.set("view engine", "ejs");

app.use(cookieParser());

app.use(express.json());

app.use("/", routes);

app.listen(8000);

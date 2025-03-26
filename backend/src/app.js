const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const adminRoutes = require("./routes/admin.routes");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.static("public"));

//routes
app.use("/api/v1/admin", adminRoutes);

module.exports = app;

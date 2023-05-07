const express = require("express");
const app = express();
const dotenv = require("dotenv");


const incomeRouter = require("./routes/incomeRoutes");
const authRouter = require("./routes/authRoutes")
const expenseRouter = require("./routes/expenseRoutes");

dotenv.config();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/v1/income", incomeRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/expense", expenseRouter);


module.exports = app;
const express = require("express");
require("dotenv").config();
const { connection } = require("./configs/db");
const cors = require("cors");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
const { auth } = require("./middlewares/auth.middleware");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Linkedin");
});

app.use("/users", userRouter);
app.use(auth);
app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Server is running and connected to db");
  } catch (err) {
    console.log(err);
  }
});

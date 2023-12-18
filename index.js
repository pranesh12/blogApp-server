const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

//usign Router

app.get("/", (req, res) => {
  res.send("Hello welcome new Dawn api");
});
app.use("/", userRouter);
app.use("/blogs", blogRouter);

const baseUrl = `mongodb+srv://${process.env.USER_NAME}:${process.env.DATA_BASE_PASS}@cluster0.vebeiel.mongodb.net/${process.env.DATA_BASE_NAME}?retryWrites=true&w=majority`;
mongoose.connect(baseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(PORT, () => {
    console.log(`server is runnit on ${PORT}`);
  });
});

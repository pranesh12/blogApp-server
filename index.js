const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 5000;

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

//usign Router

// app.use("/", userRouter);
app.use("/", userRouter);
app.use("/blogs", blogRouter);

mongoose.connect(`mongodb://127.0.0.1:27017/blog`, {
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

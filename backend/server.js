const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");
const app = express();
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());

// database
mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(() => {
  console.log("MongoDB connected!");
});

// router
// const userRouter = require("./routes/user.js");
// app.use("/", userRouter);

// dynamically all router
readdirSync("./routes").map((file) => app.use("/api", require("./routes/" + file)));

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const PORT = process.env.PORT || 5000;

const app = express();


app.use(express.json());
app.use("/auth", authRouter);
// app.use("/get", getRouter);
app.use(express.static(__dirname));

const start = async () => {
  try {
    await mongoose.connect("mongodb+srv://Matmin:funny123@cluster0.liajj.mongodb.net/personal-dicrionary?retryWrites=true&w=majority")
    app.listen(PORT, () => { console.log(`Server started on port ${PORT}`)})
  } catch (e) {
    console.log(e);
  }
}

start();

//-------------------------------



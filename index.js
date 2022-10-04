const express = require("express");
const cors = require("cors");
const body = require("body-parser");
const MongoDbService = require("./mongo/mongo");

const app = express();
app.use(body.json());
app.use(cors());

//api
app.post("/register", (req, res) => {
  MongoDbService.collection().then(async ({ collection }) => {
    const userIsAva = await collection.findOne({ Email: req.body.Email });
    if (userIsAva) {
      res.status(500).json({ message: "user already exist" });
    } else {
      collection.insertOne(req.body).then(() => {
        res.json({ message: "user Registered" });
      });
    }
  });
});

app.post("/verifyUser", (req, res) => {
  const { Email, password } = req.body;
  MongoDbService.collection().then(async ({ collection }) => {
    const userIsAva = await collection.findOne({
      Email: Email,
      password: password,
    });
    if (userIsAva) {
      res.json({ message: "Login successfully", id: userIsAva._id });
    } else {
      res.status(500).json({ message: "invalid user" });
    }
  });
});

//listen

app.listen(8000, () => {
  console.log("connected");
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

mongoose.set("strictQuery", false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

const customers = [
  {
    name: "Adeyemi Segun",
    industry: "Drama",
  },

  {
    name: "Rhoda",
    industry: "Health",
  },
  {
    name: "Araoluwa",
    industry: "Engineering",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome Home");
});

app.get("/api/customers", (req, res) => {
  res.send({ data: customers });
});

app.post("/api/customers", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post("/", (req, res) => {
  res.send("<h1>This is a post</h1>");
});

//connection string:  "mongodb+srv://piemicah:goodpie222@customer.r7qodgh.mongodb.net/?retryWrites=true&w=majority"

const start = async () => {
  try {
    await mongoose.connect(CONNECTION);
    app.listen(PORT, () => {
      console.log("App listening on port " + PORT);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();

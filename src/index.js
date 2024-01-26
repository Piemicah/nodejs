const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Customer = require("./models/customers");
const cors = require("cors");

mongoose.set("strictQuery", false);

app.use(cors());
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

const customer = new Customer({
  name: "Araoluwa",
  industry: "Engineering",
});

app.get("/", (req, res) => {
  res.send("Welcome");
});

//reading all customers
app.get("/api/customers", async (req, res) => {
  try {
    const result = await Customer.find();
    res.send({ data: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//reading single customer
app.get("/api/customers/:id", async (req, res) => {
  console.log({ requestParams: req.params, requestQuery: req.query });
  try {
    const customerId = req.params.id;
    console.log(customerId);

    const customer = await Customer.findById(customerId);
    if (!customer) {
      res.status(404).json({ error: "User not found" });
    } else res.json({ customer });
  } catch (e) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/customers", async (req, res) => {
  console.log(req.body);
  const customer = new Customer(req.body);
  try {
    await customer.save();
    res.status(201).json({ customer });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/", (req, res) => {
  res.send("<h1>This is a post</h1>");
});

//updating single customer
app.put("/api/customers/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const result = await Customer.replaceOne({ _id: customerId }, req.body);
    const customer = await Customer.findById(customerId);
    console.log(result);
    res.json({
      updatedCount: result.modifiedCount,
      updatedCustomer: customer,
    });
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

//deleting
app.delete("/api/customers/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const result = await Customer.deleteOne({ _id: customerId });
    console.log(result);
    res.json({ deletedCount: result.deletedCount });
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

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

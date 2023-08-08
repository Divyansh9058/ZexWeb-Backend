const express = require("express");
const { business } = require("../Models/business.model");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const businessRouter = express.Router();

businessRouter.get("/", async (req, res) => {
  try {
    const userdata = await business.find();
    res.send(userdata);
  } catch (err) {
    res.send({ msg: err.message });
  }
});

businessRouter.post("/addbusiness", async (req, res) => {
  let { name, email, service, phone, status } = req.body;
  try {
    const contact = new business({
      name,
      email,
      service,
      phone,
      status
    });
    await contact.save();
    res.send({ msg: "Business Contact has been added" });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

businessRouter.patch("/editbusiness/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body; 
    await business.findByIdAndUpdate(id, payload);
    res.send({ msg: "Status updated" });
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
});

businessRouter.delete("/delete/:id", async (req, res) => {
  try {
    const contactID = req.params.id;
    await business.findByIdAndDelete({ _id: contactID });
    res.send({ msg: "Data deleted" });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

module.exports = {
  businessRouter,
};

const express = require("express");
const { contactUs } = require("../Models/contactMe");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const contactUsRouter = express.Router();

contactUsRouter.get("/", async (req, res) => {
  try {
    const userdata = await contactUs.find();
    res.send(userdata);
  } catch (err) {
    res.send({ msg: err.message });
  }
});

contactUsRouter.post("/addcontact", async (req, res) => {
  let { name, email, message, phone, status } = req.body;
  try {
    const contact = new contactUs({
      name,
      email,
      message,
      phone,
      status
    });
    await contact.save();
    res.send({ msg: "Contact has been added" });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

contactUsRouter.patch("/editcontact/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    await contactUs.findByIdAndUpdate(id, payload);
    res.send({ msg: "Status updated" });
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
});

contactUsRouter.delete("/delete/:id", async (req, res) => {
  try {
    const contactID = req.params.id;
    await contactUs.findByIdAndDelete({ _id: contactID });
    res.send({ msg: "Data deleted" });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

module.exports = {
  contactUsRouter,
};

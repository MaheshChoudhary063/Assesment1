const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const FormDataModel = require("./Model/users.model");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://mahesh63choudhary:I71UknEQ2MjqcerP@cluster0.silh8hf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);


app.post("/register", (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.json("Already registered");
    } else {
      FormDataModel.create(req.body)
        .then((log_reg_form) => res.json(log_reg_form))
        .catch((err) => res.json(err));
    }
  });
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Wrong password");
      }
    } else {
      res.json("No records found! ");
    }
  });
});


app.post("/reset-password", (req, res) => {
  const { email, newPassword } = req.body;
  FormDataModel.findOneAndUpdate(
    { email: email },
    { password: newPassword },
    { new: true }
  )
    .then((updatedUser) => {
      if (updatedUser) {
        res.json("Password reset successful");
      } else {
        res.json("No user found with this email");
      }
    })
    .catch((err) => {
      res.json("Error occurred while resetting password");
    });
});

app.listen(3001, () => {
  console.log("Server listening on http://127.0.0.1:3001");
});

const express = require("express");
// const router = express.Router();

const nodemailer = require("nodemailer");
const config = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "maqsoodmaxood75@gmail.com",
    pass: "ubjicwyralgnizrg",
  },
});

  const sendEmail = (name, email, message) => {

  try {

      const  mailOptions = {
        from: "maqsoodmaxood75@gmail.com",
        to: email,
        subject: "A new contact us request has been received",
        text:
        `Hi ${name},\n\nThank you for contacting us.\n\nYour email is: ${email}.\n\nYour contact number is:\n\nYour enquiry is: ${message}\n.`,
      };

      config.sendMail(mailOptions, function (err, result) {
        if (err) {
          console.log(err);
          return err;
        } else {
          console.log("Email sent: " + result.response);
          return result.response;
        }
      });

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.export  = sendEmail();

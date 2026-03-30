const nodemailer = require("nodemailer");

const transporter = require("nodemailer").createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b3e95904783b05",
    pass: "d59525c376c032"
  }
});

module.exports = transporter;
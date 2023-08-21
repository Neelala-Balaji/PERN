const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "balaji.neelala@gmail.com", //email id
    pass: "liecgzcqgstvjfrk", //email password
  },
});

// Function to send email
async function sendEmail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: "balaji.neelala@gmail.com",
      to: to,
      subject: subject,
      text: text,
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendEmail;

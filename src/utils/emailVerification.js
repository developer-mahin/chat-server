const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

exports.verifyEmailAddress = async (data) => {
  try {
    const mailInfo = {
      from: process.env.SMTP_USER,
      to: data.email,
      subject: data.subject,
      html: data.html,
    };
    const info = await transporter.sendMail(mailInfo);
    console.log("message %s", info.response);
  } catch (error) {
    throw error;
  }
};

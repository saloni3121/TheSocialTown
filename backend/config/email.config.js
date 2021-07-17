
const nodemailer = require('nodemailer');

const sendEmail = async (recepientEmail, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.COMPANY_EMAIL,
      pass: process.env.COMPANY_EMAIL_PASSWORD,
    },
  });

  transporter.sendMail({
    from: process.env.COMPANY_EMAIL,
    to: recepientEmail,
    subject: subject,
    text: text,
  });
  transporter.close();
};

module.exports = {
  sendEmail,
};

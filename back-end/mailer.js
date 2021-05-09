const action = require('./server');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'availabilityvaccine@gmail.com',
    pass: '<password>'
  }
});

exports.sendEmail = function (slots, email, id) {
    const mailOptions = {
        from: 'availabilityvaccine@gmail.com',
        to: email,
        subject: 'vaccine Available in your region',
        text: JSON.stringify(slots)
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          action.deleteUser(id);
        }
      });
};
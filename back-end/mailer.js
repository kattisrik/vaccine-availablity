const action = require('./server');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'availabilityvaccine@gmail.com',
    pass: '<password>'
  }
});

function formatMessage(slots) {
  let locations = "";
  slots.map((slot) => {
    let location = slot.vaccine + " is available on " + slot.date + " Location: " + slot.name + " Address: " + slot.address + ". During the following slots: " + slot.slots.join(", ") + ". ";
    locations = locations.concat(location);
  })
  return locations;
}

exports.sendEmail = function (slots, email, id) {
    const mailOptions = {
        from: 'availabilityvaccine@gmail.com',
        to: email,
        subject: "Available in " + slots.length + " locations. ",
        text: formatMessage(slots)
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
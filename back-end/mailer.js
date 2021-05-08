let nodemailer = require('nodemailer');

let nodemailerTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: String(process.env.EMAIL),
        pass: String(process.env.PASSWORD)
    }
});

exports.sendEmail = function (email, subject, details, callback) {
    let options = {
        from: String('Vaccine-Availablity ' + process.env.EMAIL),
        to: email,
        subject: subject,
        text: 'Vaccine available. Details: \n\n' + details
    };
    nodemailerTransporter.sendMail(options, (error, info) => {
        if (error) {
            return callback(error);
        }
        callback(error, info);
    });
};
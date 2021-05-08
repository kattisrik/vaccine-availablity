const mailer = require('./mailer');
require('dotenv').config()

mailer.sendEmail("availabilityvaccine@gmail.com", "hello", "you're amazing", (error, result) => {
    if(error) console.error({error})
})
const moment = require('moment');
const request = require('request');
const notifier = require('./mailer');

async function getSlots(user) {
    const currentDate = moment();
    request('http://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=' + user.pincode + '&date=' + currentDate.format('DD-MM-YYYY'), 
            { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        let sessions = body.sessions;
        let validSlots = sessions.filter(slot => slot.min_age_limit <= user.age &&  slot.available_capacity > 0)
        if(validSlots.length > 0) {
            notifier.sendEmail(validSlots, user.email, user._id);
        }
    });
}

exports.checkAvailability = async function(userList) {
    if(userList.length > 0) {
        userList.map(async (user) => {
            await getSlots(user)
        })
    }
}
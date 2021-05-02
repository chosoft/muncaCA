const nodemailer = require('nodemailer')
const { config } = require('./../../configs/sendMail')
async function sendMail({userMail,mails,subject,msg}){
    return new Promise(async (resolve, reject) => {
        try {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user: config.mail, // generated ethereal user
                pass: config.password, // generated ethereal password
              },
            });
          
            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: userMail, // sender address
              to: mails.join(), // list of receivers
              subject, // Subject line
              text: msg, // plain text body
              html: msg, // html body
            });
            resolve('ok')
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = sendMail
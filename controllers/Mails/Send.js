const validateMail = require('./../../utils/schemas/MailSchema')
const { getMail } = require('./../../models/User')
const sendMail = require('./../../utils/mails/SendMail')
const { saveMail } = require('./../../models/Mail')
function SendController(obj){
    return new Promise(async (resolve, reject) => {
        try {
            const validateResult = await validateMail(obj)            
            const getUserMail = await getMail(obj.id)
            obj.userMail = getUserMail
            const sendMailResult = await sendMail(obj)
            const saveMailResult = await saveMail(obj)
            resolve(saveMailResult)

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = SendController
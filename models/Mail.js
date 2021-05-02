const mongoose = require('mongoose')
const { Schema,model,Types } = mongoose

const mailSchema = new Schema({
    subject:{type: String,required: true},
    msg: {type:String,required: true},
    mails: {type: Array,required: true},
    idsMails: {type: Array,required: true},
    id:{type:Types.ObjectId,required: true},
    userMail: {type:String,required: true}
})

const Mail = new model('Mails', mailSchema)

function saveMail(obj){
    return new Promise(async (resolve, reject) => {
        try {
            const mail = new Mail(obj)
            const mailSave = await mail.save()
            resolve('ok')
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    saveMail,
}
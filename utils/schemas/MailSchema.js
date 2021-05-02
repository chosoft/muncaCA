const Joi = require('joi');
const mailSendSchema = Joi.object({
    subject: Joi.string()
                .min(10)
                .max(45)
                .required(),
    msg: Joi.string()
            .min(30)
            .max(1000)
            .required(),
    mails: Joi.array()
                .min(1)
                .required(),
    idsMails:Joi.array()
                .min(1)
                .required(),
    id:Joi.string()
})
const mailsSchema = Joi.object({
    mail: Joi.string()
                .email({minDomainSegments: 2})
})

function validateMailToSend(obj) {
    return new Promise(async (resolve, reject) => {
        try {
            const { value,error } = await mailSendSchema.validate(obj)
            if(error){
                reject(error)
            }else{
                obj.mails.forEach(async(mail,index) =>{
                    try {
                        const { value,error } = await mailsSchema.validate({mail})
                        if(error){
                            reject(`${mail} is invalid`)
                        }else{
                            if(index+1 === obj.mails.length){
                                resolve(obj)
                            }else{

                            }
                        }
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = validateMailToSend
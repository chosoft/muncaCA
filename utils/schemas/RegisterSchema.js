const Joi = require('joi');
const registerSchema = Joi.object({
    username: Joi.string()
                .min(3)
                .max(30)
                .required(),
    password: Joi.string()
                .alphanum()
                .min(8)
                .required(),
    passwordConfirmation: Joi.ref('password'),
    email: Joi.string()
                .email({minDomainSegments: 2})
                .required(),
    phone: Joi.string()
                .min(10)
                .max(10)
                .required(),
})
function registerSchemaValidation(obj){
    return new Promise(async(resolve, reject) => {
        try {
            const { value,error } = await registerSchema.validate(obj)
            if(error){
                let messages = []
                const details = error.details
                details.forEach(({message},index) => {
                    messages.push(message)
                    if(index === details.length -1){
                        reject(messages)
                    }else{

                    }
                })
            }else{
                resolve(value)
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = registerSchemaValidation
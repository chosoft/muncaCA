const Joi = require('joi');
const passwordSchema = Joi.object({
    password: Joi.string()
                .alphanum()
                .min(8)
                .required(),
    id: Joi.string()
})

function validateSchema(obj) {
    return new Promise(async (resolve, reject) => {
        try {
            const { value,error } = await passwordSchema.validate(obj)
            if(error) {
                reject(error)
            }else{
                resolve(value)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = validateSchema
const Joi = require('joi');
const modelosSchema = Joi.object({
    colegio: Joi.string()
                .min(3)
                .max(40)
                .required(),
    modelo: Joi.string()
                .min(3)
                .max(30)
                .required(),
    ubicacion: Joi.string()
                .min(3)
                .max(30),
    email: Joi.string()
                .email({minDomainSegments: 2})
                .required(),
    lideres: Joi.array()
                .min(1)
                .required(),
    creator: Joi.string()
                .required(),
})
const lideresSchema = Joi.object({
    nombre: Joi.string()
                .min(3)
                .max(30)
                .required(),    
    email: Joi.string()
                .email({minDomainSegments: 2})
                .required(),
    phone: Joi.string()
                .min(10)
                .max(10)
                .required()
})
function modelosSchemaValidation(obj){
    return new Promise(async (resolve, reject) => {
        try {
            const { value,error } = await modelosSchema.validate(obj);
            if(error){
                let messages = []
                const details = error.details
                details.forEach(({message},index) => {
                    messages.push(message)
                    if(index === details.length - 1){
                        reject(messages)
                    }else{

                    }
                })
            }else{
                obj.lideres.forEach(async(lider, index) => {
                    try {
                        const {value,error} = lideresSchema.validate(lider)
                        if(error){
                            reject(`Error ${error.details[0].message} en el lider ${index+1}`)
                        }else{
                            if(index === obj.lideres.length -1){
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
module.exports = modelosSchemaValidation
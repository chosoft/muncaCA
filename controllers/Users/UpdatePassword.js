const validatePassword = require('./../../utils/schemas/PasswordSchema')
const { updatePassword } = require('./../../models/User')
function UpdatePassword(obj){
    return new Promise(async (resolve, reject) => {
        try {
            const validateResult = await validatePassword(obj)
            const updateModelResult = await updatePassword(validateResult)
            resolve(updateModelResult)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = UpdatePassword
const { deleteModelo } = require('./../../models/Modelos')
function ControllerDelete(key){
    return new Promise(async (resolve, reject) => {
        try {
            const modelResult = await deleteModelo(key)
            resolve(modelResult)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = ControllerDelete
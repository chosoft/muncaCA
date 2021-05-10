const { getModelByName } = require('./../../models/Modelos')

function GetFilterController(modelo){
    return new Promise(async (resolve, reject) => {
        try {
            const modelResponse = await getModelByName(modelo)
            resolve(modelResponse)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = GetFilterController
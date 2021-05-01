const { deleteDoc } = require('./../../models/Documentos')
const deleteDocServer = require('./../../utils/fileSystem/deleteDoc')
function DeleteController(key){
    return new Promise(async (resolve, reject) => {
        try {
            const modelResult = await deleteDoc(key)
            const deleteServerResult = await deleteDocServer(modelResult)
            resolve(deleteServerResult)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = DeleteController
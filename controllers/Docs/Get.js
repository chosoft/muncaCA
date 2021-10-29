const { getDocuments } = require('./../../models/Documentos')
function GetController(){
    return new Promise(async (resolve, reject) => {
        try {
            const documentos = await getDocuments()
            resolve(documentos)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = GetController
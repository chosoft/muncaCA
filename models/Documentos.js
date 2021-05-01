const mongoose = require('mongoose')
const { Schema,model,Types } = mongoose

const docsSchema = new Schema({
    originalname: {type:String,required: true},
    path: {type:String,required:true},
    creator: {type:Types.ObjectId,required:true},
    icon: {type:String,required:true},
    upload: {type:Date,default:Date.now(),required:true}
})

const Documento = new model('Documentos',docsSchema)
function saveDocs(arrayObjs){ 
    return new Promise(async (resolve, reject) => {
        try {
            arrayObjs.forEach(async(docToSave,index) => {
                try {
                    let doc = new Documento(docToSave)
                    const resultSave = doc.save()

                    if(index + 1 === arrayObjs.length){
                        resolve('ok')
                    }else{

                    }
                } catch (e) {
                    reject(e)
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}
function deleteDoc(id){
    return new Promise(async (resolve, reject) => {
        try {
            const { path } = await Documento.findById(id)
            const deleteDoc = await Documento.deleteOne({_id:Types.ObjectId(id)})
            resolve(path)
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    saveDocs,
    deleteDoc,
}
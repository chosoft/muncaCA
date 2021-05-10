const mongoose = require('mongoose')
const { Schema,model,Types } = mongoose

const modeloSchema = new Schema({
    colegio: {type: String,required: true},
    modelo: {type: String,required: true},
    ubicacion: {type: String,required: true},
    email: {type: String,required: true},
    lideres: {type: Array,required: true},
    creator: {type: mongoose.ObjectId,required: true},
    logo: {type: String,required: true,default:'/img/modelosImg/default.svg'}
})

const Modelo = new model('Modelo', modeloSchema)

function saveModelo(obj){
    return new Promise(async (resolve, reject) => {
        try {
            const uniqueName = await Modelo.findOne({modelo: obj.modelo})
            if(uniqueName === null){
                const modelo = new Modelo(obj)
                const saveResult = await modelo.save()
                resolve('ok')
            }else{
                reject('modelYetSave')
            }
        } catch (e) {
            reject(e);
        }
    })
}
function deleteModelo(key){
    return new Promise(async (resolve, reject) => {
        try {
            const deleteResult = await Modelo.deleteOne({_id: Types.ObjectId(key)})
            resolve('ok')
        } catch (e) {
            reject(e);
        }
    })
}
function getModels(){
    return new Promise(async (resolve, reject) => {
        try {
            const modelos = await Modelo.find({})
            if(modelos === null || modelos.lenght <= 0){
                resolve('nulos')
            }else{
                resolve(modelos)
            }
        } catch (e) {
            reject(e);
        }
    })
}
function getModelByName(modelo){
    return new Promise(async (resolve, reject) => {
        try {
            const modeloInfo = await Modelo.findOne({modelo})
            const isNull = modeloInfo ? false : true
            resolve({isNull,modeloInfo})
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    saveModelo,
    deleteModelo,
    getModels,
    getModelByName,
}
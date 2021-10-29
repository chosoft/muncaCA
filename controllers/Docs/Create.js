let wordExtensions = ['doc','docx','docm','dotx','dotm','rtf']
let powerPointExtension = ['pptx','pptm','potm','ppam','ppsx','sldm','thmx','sldx','ppsm','potx']
let excelExtension = ['xlsx','xlsm','xltx','xltm','xlsb','xlam']
let zipExtension = ['zip','rar']
let imageExtension = ['jpg','png','gif','tiff','svg','bmp','eps','jpeg','jfif']
let videoExtension = ['mp4','ogg','mpeg','mpg','wmv','wm']
let audioExtension = ['mp3','avi','wav','midi']
let pdfExtension = ['pdf']
let textExtension = ['txt','text']
const extensions = [wordExtensions,powerPointExtension,excelExtension,zipExtension,imageExtension,videoExtension,audioExtension,pdfExtension,textExtension]
const { saveDocs } = require('./../../models/Documentos')
function ControllerCreate(obj){
    return new Promise( async(resolve, reject) => {
        try {
            const docs = await createDocsArray(obj.files,obj.creator)
            const modelResponse = await saveDocs(docs)
            resolve(modelResponse)
        } catch (e) {
            reject(e);
        }
    })
}

function createDocsArray(docsInfo,id){
    return new Promise(async (resolve, reject) => {
        try {
            let finalDocsArray = []
            let obj = {}
            docsInfo.forEach(async (doc,index) => {
                try {
                    const originalname = await extractName(doc.filename)
                    const icon = await iconOfFiletype(doc.filename)
                    const path = `/docs/${doc.filename}`

                    obj = {
                        originalname,
                        path,
                        creator: id,
                        icon,
                    }

                    finalDocsArray.push(obj)

                    if(index+1 === docsInfo.length){
                        resolve(finalDocsArray)
                    }else{
                        
                    }
                } catch (e) {
                    reject(e);
                }
            })
        } catch (e) {
            reject(e);
        }
    })
}   

function extractName(filename){
    return new Promise(async (resolve, reject) => {
        try {
            const originalFileName = filename.substring(filename.indexOf('%')+1, filename.lastIndexOf('%'))
            resolve(originalFileName)
        } catch (e) {
            reject(e);
        }
    })
}
function iconOfFiletype(filename){
    return new Promise(async (resolve, reject) => {
        try {
            const extension = filename.substring(filename.lastIndexOf('.')+1)
            extensions.forEach((ext,index) => {
                if(ext.includes(extension)){
                    resolve(index)
                }else{
                    if(index+1 === extensions.length){
                        resolve(9)
                    }else{

                    }
                }
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = ControllerCreate
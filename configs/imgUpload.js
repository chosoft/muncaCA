const multer = require('multer')
const path = require('path')
const uniqid = require('uniqid')

let filesTypes = ['jpg','png','tiff','svg','bmp','eps','jpeg','jfif']

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, path.join(__dirname, '../public/img/profile'))
    },
    filename: (req,file,cb) => {
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'))
        const realName = file.originalname.substring(0,file.originalname.lastIndexOf('.'))
        const id = uniqid()
        cb(null, `${id}%${realName}%${Date.now()}${extension}`)
    },
    size: 20971520
})

const upload = multer({storage,
    fileFilter: (req,file,cb) => {
        let admited = []
        for (let a = 0; a < filesTypes.length; a++) {
            if(path.extname(file.originalname) === '.'+filesTypes[a]){
                admited.push(true)
                break
            }else{

            }
        }
        if(admited.length >= 1){
            cb(null,true)
        }else{
            cb(null,false)
        }
    }
})


module.exports = upload
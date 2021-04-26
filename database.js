const mongoose = require('mongoose')
const { config } = require('./configs/envConfig')

const OPTIONS = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
}
const URI = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}${config.dbName}?retryWrites=true&w=majority`

mongoose.connect(URI,OPTIONS,(err) =>{
    if(err){
        delete err
        console.log(`[SERVER][DATABASE] ERROR TO CONNECT DATABASE`)
    }
})

//Connection State
const { connection } = mongoose

connection.on('error',(err)=>{
    if(err){
        delete err
        console.log(`[SERVER][DATABASE] A ERROR HAS BEEN TO CONNECT TO DATABASE `)
    }
})

connection.on('disconnected', () => {
    console.log(`[SERVER][DATABASE] WE LOST THE CONNECTION TO DATABASE`)
})
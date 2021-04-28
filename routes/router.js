const indexRouter = require('./index/index');
const modelosRouter = require('./modelos/modelos')
const documentosRouter = require('./docs/docs')
const router = (server) => {
    server.use('/',indexRouter)
    server.use('/modelos',modelosRouter)
    server.use('/documentos',documentosRouter)
}

module.exports = router
const indexRouter = require('./index/index');
const modelosRouter = require('./modelos/modelos')
const documentosRouter = require('./docs/docs')
const perfilRouter = require('./perfil/perfil')
const mailRouter = require('./mails/mails')
const router = (server) => {
    server.use('/',indexRouter)
    server.use('/modelos',modelosRouter)
    server.use('/documentos',documentosRouter)
    server.use('/perfil',perfilRouter)
    server.use('/mail',mailRouter)
}

module.exports = router
const indexRouter = require('./index/index');
const registrarseRouter = require('./index/registrarse')
const modelosRouter = require('./modelos/modelos')
const addModelos = require('./modelos/add')
const modeloFilter = require('./modelos/filter')
const documentosRouter = require('./docs/docs')
const perfilRouter = require('./perfil/perfil')
const mailRouter = require('./mails/mails')
const notFound = require('./handlers/404')
const exit = require('./handlers/exit')
const router = (server) => {
    server.use('/',indexRouter)
    server.use('/registrarse',registrarseRouter)
    server.use('/modelos',modelosRouter)
    server.use('/documentos',documentosRouter)
    server.use('/add',addModelos)
    server.use('/filter',modeloFilter)
    server.use('/perfil',perfilRouter)
    server.use('/mail',mailRouter)
    server.use('/exit',exit)
    server.use(notFound)
}

module.exports = router
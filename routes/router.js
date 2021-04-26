const indexRouter = require('./index/index');
const modelosRouter = require('./modelos/modelos')
const router = (server) => {
    server.use('/',indexRouter)
    server.use('/modelos',modelosRouter)
}

module.exports = router
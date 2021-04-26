const indexRouter = require('./index/index');
const router = (server) => {
    server.use('/',indexRouter)
}

module.exports = router
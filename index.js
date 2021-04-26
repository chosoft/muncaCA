const express = require('express')
const path = require('path')
const helmet = require('helmet')
const session = require('express-session')
const force = require('express-force-domain')
const configSession = require('./configs/session.config')
const router = require('./routes/router')
const { config } = require('./configs/envConfig')
const app = express()
require('./database')

app.set("views",path.join(__dirname,"views"))
app.set("view engine","pug")

app.use(express.static(path.join(__dirname,"public")))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(helmet())
app.use(session(configSession))

app.disable('x-powered-by')

app.use(force(`http://localhost:${config.port}`))

router(app)

const server = app.listen(config.port || process.env.PORT, () => {
    console.log(`[SERVER] THE SERVER IS http://localhost:${server.address().port}/`)
})

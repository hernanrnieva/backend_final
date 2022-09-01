/* Module imports */
import express from 'express'
import { Server as IOServer } from 'socket.io'
import { Server as HTTPServer } from 'http'
import cookieParser from 'cookie-parser'
import handlebars from 'express-handlebars'
import session from 'express-session'
import passport from 'passport'

/* File imports */
import router from './routes/main.js'
import { port } from './controllers/config/config.js'
import messageSocket from './routes/sockets/message.js'
import { sessionSecret, sessionMaxAge } from './controllers/config/config.js'

/* Arguments init */
const PORT = port? port : 8080

/* Server initialization */
const app = express()
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

app.use(cookieParser())
app.use(session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: parseInt(sessionMaxAge)
    }
}))

app.use(express.static('./public'))
app.use(passport.initialize())
app.use(passport.session())

const server = httpServer.listen(PORT, () => {
    console.log(`Server is up listening at PORT: ${PORT} and PROCESS: ${process.pid}`)
})
server.on('error', (error) => {
    // console.log(`Error encountered: ${error}`)
})
/* ##### Server Up ##### */

/* Template configuration */
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.engine('hbs', handlebars({
    extname: 'hbs',
    layoutsDir: './public/views/layouts',
    defaultLayout: ''
}))
app.set('views', './public/views')
app.set('view engine', 'hbs')

/* Routing */
app.use('/', router)

/* Socket functionality */
io.on('connection', (socket) => {
    messageSocket.sendMessages(socket)

    socket.on('message', (message) => {
        messageSocket.createMessage(message, socket, io.sockets)
    })
})
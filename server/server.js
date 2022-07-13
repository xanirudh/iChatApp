const express = require('express')

const app = express()

const http = require('http').createServer(app)


const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

let str = __dirname;
let newStr = str.replace("server", "frontend")

app.use(express.static(newStr + '/public'))

app.get('/', (req, res) => {
    res.sendFile(newStr + '/index.html')
})

// Socket

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected....')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})
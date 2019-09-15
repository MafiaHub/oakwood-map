const http = require('http')
const WebSocket = require('ws')
const serve = require('serve-handler')
const {createClient} = require('oakwood')

const HTTP_PORT = process.env.HTTP_PORT || 8080
const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 8081

const server = http
    .createServer((req, res) => serve(req, res, { public: './static' }))
    .listen(HTTP_PORT, () => console.log(`Running at http://localhost:${HTTP_PORT}`));

let oak = createClient()
let wss = new WebSocket.Server({ port: WEBSOCKET_PORT })
let tim = null

const sendAll = (data) => wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(data))
})

oak.event('playerConnect', async pid => {
    console.log('player connected')

    sendAll({
        type: 'playerConnect',pid,
        name: await oak.playerNameGet(pid),
        pos: await oak.playerPositionGet(pid),
    })
})

oak.event('playerDisconnect', pid => {
    console.log('player disconnected')
    sendAll({ type: 'playerDisconnect', pid, pos: [] })
})

oak.event('start', () => {
    oak.log('map connected')
    console.log('connected to the server')

    tim = setInterval(async () => {
        const list = await oak.playerList()
        list.map(async pid => sendAll({
            type: 'playerUpdate', pid,
            name: await oak.playerNameGet(pid),
            pos: await oak.playerPositionGet(pid),
        }))
    }, 250)
})

oak.event('stop', () => {
    oak.log('map disconnected')
    console.log('disconnected to the server')
    clearInterval(tim)
})

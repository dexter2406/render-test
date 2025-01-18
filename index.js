const http = require('http')    // 等价于 import http from 'http' ES6范式
const cors = require('cors')
const express = require('express')
const { stringify } = require('querystring')

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    },
    {
        id: "4",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

const app = express()
app.use(express.json())
app.use(cors())

app.post('/api/notes', (request, response) => {
    const note = request.body
    console.log(note)
    response.json(note)
  })

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(n => n.id === id)
    if (note)  {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.filter(n => n.id !== id)
    response.status(204).end()
})

const localPort = 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>console.log(`server run on port ${PORT}`))


import { fastify } from 'fastify'
// import { databaseMemory } from './database-memory.js'
import { databasePostgres } from './database-postgres.js'

// const database = new databaseMemory
const database = new databasePostgres


const server = fastify()

server.post('/videos', async (req, reply) => {
    const { title, description, duration } = req.body

    await database.create({
        title,
        description,
        duration
    })

    reply.status(201).send()
})

server.get('/videos', async (req, reply) => {
    const search = req.query.search

    const videos = await database.list(search)
    return videos
})

server.put('/videos/:id', (req, reply) => {
    const videoId = req.params.id
    const { title, description, duration } = req.body

    database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204)
})

server.delete('/videos/:id', async (req, reply) => {
    const videoId = req.params.id
    await database.delete(videoId)

    return reply.status(204).send()
})

server.delete('/videos/delete', (req, res) => {
    database.deleteAll()
    res.status(200).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3000
})
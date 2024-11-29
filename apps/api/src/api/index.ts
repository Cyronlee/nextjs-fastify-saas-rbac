import { FastifyRequest, FastifyReply } from 'fastify'
import { createServer } from '../http/server'

const app = createServer()

export default async function handler(
  req: FastifyRequest['raw'],
  res: FastifyReply['raw']
) {
  await app.ready()
  app.server.emit('request', req, res)
}

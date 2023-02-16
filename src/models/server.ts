import cors from 'cors'
import express, { Application } from 'express'
import { apiRoutes, userRoutes } from '../routes'

class Server {
  private app: Application

  private port: string

  private apiPaths = {
    api: '/api',
    users: '/api/users'
  }

  constructor() {
    this.app = express()
    this.port = process.env.PORT || '8000'

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(cors())

    this.app.use(express.json())

    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.apiPaths.api, apiRoutes)
    this.app.use(this.apiPaths.users, userRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`server listening on port ${this.port}`)
    })
  }
}

export default Server

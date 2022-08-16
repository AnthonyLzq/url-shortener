import { Application, Response, Request, NextFunction } from 'express'
import swaggerUi from 'swagger-ui-express'
import httpErrors from 'http-errors'

import { response } from './response'
import { Url } from './routes'
import { docs } from 'utils'

const applyRoutes = (app: Application): void => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(docs))
  app.use('/', Url)

  // Handling 404 error
  app.use((req, res, next) => {
    next(new httpErrors.NotFound('This route does not exists'))
  })
  app.use(
    (
      error: httpErrors.HttpError,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      response({
        error: true,
        message: error.message,
        res,
        status: error.status
      })
      next()
    }
  )
}

export { applyRoutes }

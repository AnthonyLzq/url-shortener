import { Router } from 'express'

import { response } from 'network/response'
import { storeUrlDto } from 'schemas'
import { UrlService } from 'services'
import { validatorCompiler } from './utils'

const Url = Router()

Url.route('/short/:id').get(async (req, res, next) => {
  const {
    params: { id }
  } = req
  const us = new UrlService({ id })

  try {
    const result = await us.process({ type: 'getOne' })

    res.redirect(result.url)
  } catch (error) {
    next(error)
  }
})

Url.route('/short').post(
  validatorCompiler(storeUrlDto, 'body'),
  async (req: CustomRequest, res, next) => {
    const {
      body: { args }
    } = req
    const us = new UrlService(args)

    try {
      response({
        error: false,
        message: await us.process({ type: 'store' }),
        res,
        status: 201
      })
    } catch (error) {
      next(error)
    }
  }
)

export { Url }

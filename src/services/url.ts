import httpErrors from 'http-errors'
import { nanoid } from 'nanoid'

import { store, getOne } from 'database'
import { Url, UrlDto } from 'schemas'
import { GE, errorHandling, EFU } from './utils'

type Process = {
  type: 'store' | 'getOne'
}

type Arguments = Partial<Url>

class UrlService {
  #args: Arguments

  constructor(args: Arguments = {}) {
    this.#args = args
  }

  public process({ type }: Process): Promise<UrlDto> {
    switch (type) {
      case 'store':
        return this.#store()
      case 'getOne':
        return this.#getOne()
      default:
        throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
    }
  }

  async #store(): Promise<UrlDto> {
    try {
      if (!this.#args.url)
        throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

      return await store({ id: nanoid(10), url: this.#args.url })
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  async #getOne(): Promise<UrlDto> {
    try {
      if (!this.#args.id)
        throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

      const { id } = this.#args
      const url = await getOne(id)

      if (!url) throw new httpErrors.NotFound(EFU.NOT_FOUND)

      return url
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }
}

export { UrlService }

/* eslint-disable no-useless-escape */
import { Static, Type } from '@sinclair/typebox'

import { id } from '.'

const urlSchema = Type.RegEx(
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
)

const url = Type.Object({
  id,
  url: urlSchema
})

type Url = Static<typeof url>

const urlDto = Type.Object({
  id: Type.Optional(id),
  url: Type.String(),
  createdAt: Type.Optional(Type.String()),
  updatedAt: Type.Optional(Type.String())
})

type UrlDto = Static<typeof urlDto>

const storeUrlDto = Type.Object({
  args: Type.Object({
    url: urlSchema
  })
})

type StoreUrlDto = Static<typeof storeUrlDto>

export { urlDto, UrlDto, url, Url, storeUrlDto, StoreUrlDto }

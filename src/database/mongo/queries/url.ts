import { Document, MergeType, Types } from 'mongoose'

import { UrlModel } from '..'
import { Url, UrlDto } from 'schemas'

const urlDBOtoDTO = (
  userDBO: Document<unknown, unknown, MergeType<UrlDBO, UrlDBO>> &
    Omit<UrlDBO, keyof UrlDBO> &
    UrlDBO & {
      _id: Types.ObjectId
    }
): UrlDto => ({
  ...userDBO.toObject(),
  createdAt: userDBO.createdAt.toISOString(),
  updatedAt: userDBO.updatedAt.toISOString()
})

const store = async (userData: Url): Promise<UrlDto> => {
  const user = new UrlModel(userData)

  await user.save()

  return urlDBOtoDTO(user)
}

const getOne = async (id: string): Promise<UrlDto | null> => {
  const user = await UrlModel.find({ id })

  return user[0] ? urlDBOtoDTO(user[0]) : null
}

export { store, getOne }

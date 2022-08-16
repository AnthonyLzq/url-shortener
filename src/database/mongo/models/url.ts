import { model, Schema } from 'mongoose'

const UrlSchema = new Schema<UrlDBO>(
  {
    id: {
      required: true,
      type: String,
      unique: true
    },
    url: {
      required: true,
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: {
      transform: (_, ret) => {
        delete ret._id
      }
    }
  }
)

const UrlModel = model<UrlDBO>('urls', UrlSchema)

export { UrlModel }

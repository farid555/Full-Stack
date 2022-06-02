import mongoose, { Date, Document } from 'mongoose'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  role: string
  email: string
  phone: string
  address: string
  gender: string
  image: string
  password: string
  status: string
  borrowBook: {
    bookId: string
    getBorrow: Date
    returnBook: Date
  }[]
}

const bookSchema = new mongoose.Schema({
  firstName: {
    type: String,
    index: true,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  borrowBook: [
    {
      bookId: {
        type: mongoose.Types.ObjectId,
        ref: 'Book',
      },
      getBorrow: Date,
      returnBook: Date,
    },
  ],
})

export default mongoose.model<UserDocument>('User', bookSchema)

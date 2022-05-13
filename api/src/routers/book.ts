import express from 'express'
import protect from '../middlewares/authMiddleware'
import * as bookController from '../controllers/book'

const router = express.Router()

router
  .route('/')
  .get(bookController.findAll)
  .post(protect, bookController.createBook)

router
  .route('/:bookId')
  .get(bookController.findById)
  .put(protect, bookController.updateBook)
  .delete(protect, bookController.deleteBook)

export default router

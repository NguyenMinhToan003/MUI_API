import express from 'express'
import { columnValidation } from '~/validations/columnValidation'
import { columnController } from '~/controllers/columnController'
const Router = express.Router()

// moi route se duoc viet get post put delete trong Router.route
Router.route('/')
  .post(columnValidation.createNew, columnController.createNew)
Router.route('/:id')
  .put(columnValidation.update, columnController.update)

export const ColumnRoute = Router
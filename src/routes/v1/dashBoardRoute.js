import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { dashBoardValidation } from '~/validations/dashBoardValidation'
import { boardController } from '~/controllers/boardController'
const Router = express.Router()

// moi route se duoc viet get post put delete trong Router.route
Router.route('/')
  .get((req, res ) => res.status(StatusCodes.OK).json({ message: 'Get all board' }))
  .post(dashBoardValidation.createNew, boardController.createNew)
Router.route('/:id')
  .get(boardController.getDetail)
export const BoardRoute = Router
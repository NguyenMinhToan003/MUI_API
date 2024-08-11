import express from 'express'
// import { StatusCodes } from 'http-status-codes'
import { dashBoardValidation } from '~/validations/dashBoardValidation'
import { boardController } from '~/controllers/boardController'
const Router = express.Router()

// moi route se duoc viet get post put delete trong Router.route
Router.route('/')
  .post(dashBoardValidation.createNew, boardController.createNew)
export const BoardRoute = Router
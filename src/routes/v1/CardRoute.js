import express from 'express'
import { cardValidation } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardController'
const Router = express.Router()

// moi route se duoc viet get post put delete trong Router.route
Router.route('/')
  .post(cardValidation.createNew, cardController.createNew)

export const CardRoute = Router
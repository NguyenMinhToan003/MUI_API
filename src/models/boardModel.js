import Joi from 'joi'
import { OBJECT_ID_REGEX, OBJECT_ID_MESSAGE } from '~/utils/validation'
const BOARD_COLELCTION_NAME = 'boards'
const BOARD_SCHEMA = Joi.object({
  title: Joi.string().required().max(50).min(3).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().max(50).min(3).trim().strict(),
  columnOrderIds:Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).default([]),

  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt:Joi.date().timestamp().default(Date.now()),
  _destroy: Joi.boolean().default(false)
})
export const boardModel = { BOARD_COLELCTION_NAME, BOARD_SCHEMA }
import Joi from 'joi'
import { OBJECT_ID_REGEX, OBJECT_ID_MESSAGE } from '~/utils/validation'
const CARD_COLLECTION_NAME = 'cards'
const CARD_SCHEMA = Joi.object({
  boardId:Joi.string().required().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
  columnId:Joi.string().required().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),

  title: Joi.string().required().max(50).min(3).trim().strict(),
  description: Joi.string().optional(),

  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt:Joi.date().timestamp().default(Date.now()),
  _destroy: Joi.boolean().default(false)
})

export const cardModel = { CARD_COLLECTION_NAME, CARD_SCHEMA }
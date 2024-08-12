import Joi from 'joi'
import { OBJECT_ID_REGEX, OBJECT_ID_MESSAGE } from '~/utils/validation'

const COLUMN_COLLECTION_NAME = 'columns'
const COLUMN_SCHEMA = Joi.object({
  title: Joi.string().required().max(50).min(3).trim().strict(),
  boardId: Joi.string().required().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
  cardOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).default([]),

  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt:Joi.date().timestamp().default(Date.now()),
  _destroy: Joi.boolean().default(false)
})
export const columnModel = { COLUMN_COLLECTION_NAME, COLUMN_SCHEMA }
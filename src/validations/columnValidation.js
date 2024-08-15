import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_MESSAGE, OBJECT_ID_REGEX } from '~/utils/validation'
const createNew = async ( req, res, next ) => {
  const schema = Joi.object({
    title: Joi.string().required().max(50).min(3).trim().strict(),
    boardId: Joi.string().required().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)
  })
  try {
    // abortEarly: false de hien thi tat ca loi
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch ( error) {
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
    next(customError)
  }
}
const update = async ( req, res, next ) => {
  const schema = Joi.object({
    title: Joi.string().max(50).min(3).trim().strict(),
    cardOrderIds:Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).default([])
  })
  try {
    // abortEarly: false de hien thi tat ca loi
    await schema.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch ( error) {
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
    next(customError)
  }
}
export const columnValidation = {
  createNew,
  update
}
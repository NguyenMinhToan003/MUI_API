import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
const createNew = async ( req, res, next ) => {
  const schema = Joi.object({
    title: Joi.string().required().max(50).min(3).trim().strict(),
    description: Joi.string().required().max(50).min(3).trim().strict()
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
export const dashBoardValidation = {
  createNew
}
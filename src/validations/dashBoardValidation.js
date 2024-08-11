import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
const newBoard = async ( req, res, next ) => {
  const schema = Joi.object({
    name: Joi.string().required().max(50).min(3).trim().strict(),
    description: Joi.string().required().max(50).min(3).trim().strict()
  })
  try {
    // abortEarly: false de hien thi tat ca loi
    await schema.validateAsync(req.body, { abortEarly: false })
    // next()
    res.status(StatusCodes.OK).json({ message: 'Validation is successful' })
  } catch ( error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: new Error(error).message })
  }
}
export const dashBoardValidation = {
  newBoard
}
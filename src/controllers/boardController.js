import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
const createNew = async (req, res, next) => {
  try {
    //eslint-disable-next-line
    console.log('req.body', req.body)
    // res.status(StatusCodes.OK).json({ message: 'Validation is successful' })
    throw new ApiError(StatusCodes.CONFLICT, 'Error Test from Toan Nguyen')
  } catch (error) {
    next(error)

  }
}

export const boardController = {
  createNew
}

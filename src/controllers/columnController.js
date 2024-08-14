import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { columnService } from '~/services/columnService'
const createNew = async (req, res, next) => {
  try {
    const newColumned = await columnService.newColumn(req.body)
    res.status(StatusCodes.OK).json(newColumned)
  } catch (error) {
    const customError = new ApiError(error)
    next(customError)

  }
}

export const columnController = {
  createNew
}
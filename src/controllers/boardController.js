import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { boardService } from '~/services/boardService'
const createNew = async (req, res, next) => {
  try {
    const newBoarded = await boardService.newBoard(req.body)
    res.status(StatusCodes.OK).json(newBoarded)
  } catch (error) {
    const customError = new ApiError(error)
    next(customError)

  }
}

export const boardController = {
  createNew
}

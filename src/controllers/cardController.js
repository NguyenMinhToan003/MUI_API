import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { cardService } from '~/services/cardService'
const createNew = async (req, res, next) => {
  try {
    const newCarded = await cardService.newCard(req.body)
    res.status(StatusCodes.OK).json(newCarded)
  } catch (error) {
    const customError = new ApiError(error)
    next(customError)

  }
}

export const cardController = {
  createNew
}

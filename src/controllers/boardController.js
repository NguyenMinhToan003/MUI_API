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
const getDetail = async (req, res, next) => {
  try {
    const { id } = req.params
    const board = await boardService.getDetail(id)
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    const customError = new ApiError(error)
    next(customError)
  }
}
const update = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateBoard = await boardService.update(id, req.body)
    res.status(StatusCodes.OK).json(updateBoard)
  } catch (error) {
    const customError = new ApiError(error)
    next(customError)
  }
}
export const boardController = {
  createNew,
  getDetail,
  update
}

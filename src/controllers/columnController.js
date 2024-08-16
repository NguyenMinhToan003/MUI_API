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
const update = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatecolumn = await columnService.update(id, req.body)
    res.status(StatusCodes.OK).json(updatecolumn)
  } catch (error) {
    const customError = new ApiError(error)
    next(customError)
  }
}
const deleteColumn = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await columnService.deleteColumn(id)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    const customError = new ApiError(error)
    next(customError)
  }
}
export const columnController = {
  createNew,
  update,
  deleteColumn
}

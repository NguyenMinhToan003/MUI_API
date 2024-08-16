
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
const newColumn = async (column) => {
  try {
    const newColumn= {
      ...column
    }
    const createdColumn = await columnModel.createNew(newColumn)
    const result = await columnModel.findOneById(createdColumn.insertedId)
    if (result) {
      result.cards = []
      await boardModel.pushColumnOrderIds(result)
    }
    return result
  } catch (error) {
    throw error
  }
}
const update = async (id, reqBody) => {
  try {
    const dataUpdate = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedColumn = await columnModel.update(id, dataUpdate)
    return updatedColumn
  } catch (error) {
    throw error
  }
}
const deleteColumn = async (id) => {
  try {
    // const dataUpdate = {
    //   ...id,
    //   _destroy: true
    // }
    const column = await columnModel.findOneById(id)
    if (!column)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found')
    await columnModel.deleteColumnById(id)
    await cardModel.deleteCardByColumnId(id)
    await boardModel.removeColumnIdInColumnOrderIds(column)
    return { message: 'Delete column success' }
  } catch (error) {
    throw error
  }
}
export const columnService = { newColumn, update, deleteColumn }
/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_REGEX, OBJECT_ID_MESSAGE } from '~/utils/validation'
import { cardModel } from './cardModel'
import { columnModel } from './columnModel'
const BOARD_COLELCTION_NAME = 'boards'
const BOARD_SCHEMA = Joi.object({
  title: Joi.string().required().max(50).min(3).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().max(50).min(3).trim().strict(),
  columnOrderIds:Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).default([]),

  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt:Joi.date().timestamp().default(Date.now()),
  _destroy: Joi.boolean().default(false)
})
const validationData =async (data) => {
  return await BOARD_SCHEMA.validateAsync(data)
}

const createNew = async (data) => {
  try {
    const validData = await validationData(data)
    return await GET_DB().collection(BOARD_COLELCTION_NAME).insertOne(validData)
  } catch (error) {
    throw error
  }
}
const findOneById= async (id) => {
  try {
    // neu id la string phai chuyen ve dang new ObjectId khong thi ket qua la null
    return await GET_DB().collection(BOARD_COLELCTION_NAME).findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw error
  }
}
const getDetail = async (id) => {
  try {
    const board = await GET_DB().collection(BOARD_COLELCTION_NAME).aggregate([
      { $match:{ _id:new ObjectId(id), _destroy:false } },
      { $lookup: {
        from: columnModel.COLUMN_COLLECTION_NAME,
        localField: '_id',
        foreignField: 'boardId',
        as: 'columns' } },
      { $lookup: {
        from: cardModel.CARD_COLLECTION_NAME,
        localField: '_id',
        foreignField: 'boardId',
        as: 'cards' }
      }
    ]).toArray()
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }
    return board[0] || {}
  } catch (error) {
    throw error
  }
}
export const boardModel = { BOARD_COLELCTION_NAME, BOARD_SCHEMA, createNew, findOneById, getDetail }
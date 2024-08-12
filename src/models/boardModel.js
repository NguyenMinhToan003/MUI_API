/* eslint-disable no-useless-catch */
import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_REGEX, OBJECT_ID_MESSAGE } from '~/utils/validation'
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
    return await GET_DB().collection(BOARD_COLELCTION_NAME).findOne({ _id:new ObjectId(id) })
  } catch (error) {
    throw error
  }
}
export const boardModel = { BOARD_COLELCTION_NAME, BOARD_SCHEMA, createNew, findOneById }
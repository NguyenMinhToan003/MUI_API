import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_REGEX, OBJECT_ID_MESSAGE } from '~/utils/validation'
const CARD_COLLECTION_NAME = 'cards'
const CARD_SCHEMA = Joi.object({
  boardId:Joi.string().required().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
  columnId:Joi.string().required().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),

  title: Joi.string().required().max(50).min(3).trim().strict(),
  description: Joi.string().optional(),

  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt:Joi.date().timestamp().default(Date.now()),
  _destroy: Joi.boolean().default(false)
})
const INVALID_UPDATE_FIELDS = ['_id', 'createdAt', 'boardId']
const validationData =async (data) => {
  return await CARD_SCHEMA.validateAsync(data)
}

const createNew = async (data) => {
  try {
    const validData = await validationData(data)
    const reqData= {
      ...validData,
      boardId: new ObjectId(validData.boardId),
      columnId: new ObjectId(validData.columnId)
    }
    return await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(reqData)
  } catch (error) {
    throw error
  }
}
const findOneById= async (id) => {
  try {
    // neu id la string phai chuyen ve dang new ObjectId khong thi ket qua la null
    return await GET_DB().collection(CARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw error
  }
}
const update= async(id, dataUpdate) => {
  try {
    Object.keys(dataUpdate).forEach((key) => {
      if (INVALID_UPDATE_FIELDS.includes(key)) {
        delete dataUpdate[key]
      }
    })
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOneAndUpdate(
      { _id:new ObjectId(id) },
      { $set: dataUpdate },
      { returnDocument:'after' }
    )
    return result
  } catch ( error) {
    throw error
  }
}
const deleteCardByColumnId= async (columnId) => {
  try {
    // neu id la string phai chuyen ve dang new ObjectId khong thi ket qua la null
    const result= await GET_DB().collection(CARD_COLLECTION_NAME).deleteMany({ columnId: new ObjectId(columnId) })
    return result
  } catch (error) {
    throw error
  }
}
export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_SCHEMA,
  createNew,
  findOneById,
  update,
  deleteCardByColumnId
}
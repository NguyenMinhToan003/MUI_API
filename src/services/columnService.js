
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
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
export const columnService = { newColumn }
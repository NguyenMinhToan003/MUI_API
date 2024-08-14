
import { columnModel } from '~/models/columnModel'
const newColumn = async (column) => {
  try {
    const newColumn= {
      ...column
    }
    const createdColumn = await columnModel.createNew(newColumn)
    const result = await columnModel.findOneById(createdColumn.insertedId)
    return result
  } catch (error) {
    throw error
  }
}
export const columnService = { newColumn }
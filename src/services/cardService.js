
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
const newCard = async (card) => {
  try {
    const newCard= {
      ...card
    }
    const createdCard = await cardModel.createNew(newCard)
    const result = await cardModel.findOneById(createdCard.insertedId)
    if (result) {
      await columnModel.pushCardOrderIds(result)
    }
    return result
  } catch (error) {
    throw error
  }
}
export const cardService = { newCard }
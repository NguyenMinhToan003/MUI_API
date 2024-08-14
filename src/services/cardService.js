
import { cardModel } from '~/models/cardModel'
const newCard = async (card) => {
  try {
    const newCard= {
      ...card
    }
    const createdCard = await cardModel.createNew(newCard)
    const result = await cardModel.findOneById(createdCard.insertedId)
    return result
  } catch (error) {
    throw error
  }
}
export const cardService = { newCard }
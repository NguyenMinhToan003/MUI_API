/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/fomater'
const newBoard = async (board) => {
  try {
    const newBoard= {
      ...board,
      slug:slugify(board.title)
    }

    return newBoard
  } catch (error) {
    throw error
  }
}
export const boardService = { newBoard }
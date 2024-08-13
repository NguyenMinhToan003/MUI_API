/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/fomater'
import { boardModel } from '~/models/boardModel'
import { cloneDeep } from 'lodash'
const newBoard = async (board) => {
  try {
    const newBoard= {
      ...board,
      slug:slugify(board.title)
    }
    const createdBoard = await boardModel.createNew(newBoard)
    const result = await boardModel.findOneById(createdBoard.insertedId)
    return result
  } catch (error) {
    throw error
  }
}
const getDetail = async (id) => {
  try {
    const board = await boardModel.getDetail(id)
    const resBoard = cloneDeep(board)
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    console.log(resBoard)
    delete resBoard.cards
    return resBoard
  } catch (error) {
    throw error
  }
}
export const boardService = { newBoard, getDetail }
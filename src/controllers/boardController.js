
import { StatusCodes } from 'http-status-codes'
const createNew = async (req, res) => {
  try {
    console.log('req.body', req.body)
    res.status(StatusCodes.OK).json({ message: 'Validation is successful' })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: error.message
    })
  }
}

export const boardController = {
  createNew
}

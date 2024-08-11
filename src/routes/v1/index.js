import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { BoardRoute } from './dashBoardRoute'
const Router = express.Router()
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).send('ok')
})
Router.use('/dashboards', BoardRoute)
export const APIs_V1 = Router
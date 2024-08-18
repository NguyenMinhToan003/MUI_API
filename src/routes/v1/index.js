import express from 'express'
import { BoardRoute } from './dashBoardRoute'
import { ColumnRoute } from './ColumnRoute'
import { CardRoute } from './CardRoute'
const Router = express.Router()

Router.use('/dashboards', BoardRoute)
Router.use('/columns', ColumnRoute)
Router.use('/cards', CardRoute)
export const APIs_V1 = Router
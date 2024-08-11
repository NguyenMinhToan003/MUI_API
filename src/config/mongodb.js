import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'
import 'dotenv/config'
let trelloClientInstance = null
const clientInstance =new MongoClient(env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
// ket noi database
export const CONNECT_DB = async () => {
  // goi ket noi database voi MONGO_URI
  await clientInstance.connect()
  // ket noi thanh cong thi truy cap database voi MONGO_NAME
  trelloClientInstance = clientInstance.db(env.MONGO_NAME)
}
export const GET_DB = () => {
  if (!trelloClientInstance) throw new Error('Missing connect database!!!')
  return trelloClientInstance
}
export const CLOSE_DB = async () => {
  await clientInstance.close()
}
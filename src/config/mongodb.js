import { MongoClient, ServerApiVersion } from 'mongodb'

//sWlSgoo1FAaMUxdl
const MONGO_URI='mongodb+srv://nguyentoan:sWlSgoo1FAaMUxdl@cluster0.49din.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const MONGO_NAME='trello_db'

let trelloClientInstance = null
const clientInstance =new MongoClient(MONGO_URI, {
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
  trelloClientInstance = clientInstance.db(MONGO_NAME)
}
export const GET_DB = () => {
  if (!trelloClientInstance) throw new Error('Missing connect database!!!')
  return trelloClientInstance
}
export const CLOSE_DB = async () => {
  await clientInstance.close()
}
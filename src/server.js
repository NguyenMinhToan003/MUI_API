import express from 'express'
import { CONNECT_DB, GET_DB, CLOSE_DB} from '~/config/mongodb'
import exitHook from 'async-exit-hook'
const START_SERVER = async () => {
  const app = express()
  const hostname = 'localhost'
  const port = 8017
  app.get('/', async (req, res) => {
    // eslint-disable-next-line no-console
    console.log(await GET_DB().listCollections().toArray())
    res.send('<h1>Hello word</h1>')
  })
  app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
    console.log(`Server running http://${ hostname }:${ port }/`)
  })
  exitHook(() => {
    CLOSE_DB()
    // eslint-disable-next-line no-console
    console.log('Server stopped!!!')
  })
}


// cach 1 ket noi database immediately-invoked function expression (IIFE)
(async() => {
  try {
    // eslint-disable-next-line no-console
    console.log('1. connecting to database...')
    CONNECT_DB()
    // eslint-disable-next-line no-console
    console.log('2. Connected to database MongoDB cloud successfully!!!')
    START_SERVER()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    process.exit(0)
  }
})()


//// cach 2 ket noi database thenable
// console.log('1. connecting to database...')
// CONNECT_DB().then(() =>console.log('2. Connected to database MongoDB cloud successfully!!!'))
//   .then(START_SERVER)
//   .catch((err) => {
//     console.log(err)
//     process.exit(0)
//   })
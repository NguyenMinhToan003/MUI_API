import express from 'express'
import { env } from '~/config/environment'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
const START_SERVER = async () => {
  const app = express()
  app.use(cors(corsOptions))
  const port = env.PORT || 4000
  const hostname = 'localhost'
  app.use(express.json())
  app.use('/v1', APIs_V1)
  app.use(errorHandlingMiddleware)
  if (env.BUILD_MODE==='prod') {
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running Production ${ process.env.PORT }/`)
    })
  }
  else {
    app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
      console.log(`Server running Local Dev http://${ hostname }:${ port }/`)
    })
  }
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

import 'dotenv/config'

export const env = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_NAME: process.env.MONGO_NAME
}


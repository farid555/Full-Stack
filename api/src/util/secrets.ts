import dotenv from 'dotenv'
import fs from 'fs'

import logger from './logger'

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables')
  dotenv.config({ path: '.env' })
} else {
  logger.debug('Using .env.example file to supply config environment variables')
  dotenv.config({ path: '.env.example' }) // you can delete this after you create your own .env file!
}

// export const ENVIRONMENT = process.env.NODE_ENV
// const prod = ENVIRONMENT === 'production' // Anything else is treated as 'dev'
export const prod = 'production' // Anything else is treated as 'dev'

export const GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID']
export const JWT_SECRET = 'secret'
export const MONGODB_URI =
  'mongodb+srv://farid1234:farid1234@cluster0.ovpap.mongodb.net/?bookStore=true&w=majority'

if (!JWT_SECRET) {
  logger.error('No client secret. Set JWT_SECRET environment variable.')
  process.exit(1)
}

if (!MONGODB_URI) {
  if (prod) {
    logger.error(
      'No mongo connection string. Set MONGODB_URI environment variable.'
    )
  } else {
    logger.error(
      'No mongo connection string. Set MONGODB_URI_LOCAL environment variable.'
    )
  }
  process.exit(1)
}

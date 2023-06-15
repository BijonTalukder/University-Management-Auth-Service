import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorlogger, logger } from './shared/logger'

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string)
    // console.log('database connected')
    logger.info('database connected')

    app.listen(config.port, () => {
      logger.info(`Application app listening on port ${config.port}`)
    })
  } catch (e) {
    errorlogger.error('Failed to connect database', e)
  }
}
boostrap()

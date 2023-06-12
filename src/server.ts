import mongoose from 'mongoose'
import app from './app'
import config from './config'
async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('database connected')

    app.listen(config.port, () => {
      console.log(`Application app listening on port ${config.port}`)
    })
  } catch (e) {
    console.log('Failed to connect database', e)
  }
}
boostrap()

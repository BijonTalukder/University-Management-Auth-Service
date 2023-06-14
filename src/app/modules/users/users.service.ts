import config from '../../../config/index'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generatedUserId } from './users.utill'

const createUser = async (user: IUser): Promise<IUser | null> => {
 
 const id = await generatedUserId()
 user.id = id
  if (!user.password) {
    user.password = config.default_student_pass as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('Failed to create user')
  }
  return createdUser
}

export default {
  createUser,
}

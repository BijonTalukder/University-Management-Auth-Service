import express from 'express'
// import usersController from './user.controller'
import createUser from './user.controller'

// import usersController from './user.controller'
const router = express.Router()

router.post('/create-user', createUser)
export default router

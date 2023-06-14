import express  from 'express';
const usersController =  require ('./user.controller');
// import usersController from './user.controller'
const router = express.Router()

router.post("/create-user",usersController.createUser)
export default router
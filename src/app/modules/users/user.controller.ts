import { Request, Response } from 'express'
import usersService from './users.service'

exports.createUser = async (req: Request, res: Response) => {
  try {
    const result = await usersService.createUser(req.body)

    res.status(200).json({ sucess: true, message: 'succrss ', data: result })
  } catch (e) {
    res.status(400).json({ sucess: false, message: 'failed to ' })
  }
}

import { config } from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { IGenericcErrorMessage } from '../../interfaces/error'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({ error: err })
  const statusCode = 500
  const message = 'something went wrong'
  const errorMessages: IGenericcErrorMessage[] = []

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err.stack : undefined,
  })
  next()
}
export default globalErrorHandler

import winston from 'winston'
import path from 'path'
import { format } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, label, printf, prettyPrint } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${date.toDateString()} ${hour}:${minute}:${second} [${label}] ${level}:${message}`
})
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    label({ label: 'PH!' }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),

  transports: [
    new winston.transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winstons',
        'success-%DATE%.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
const errorlogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),

  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'winstons', 'error.log'),
      level: 'error',
    }),
  ],
})
export { logger, errorlogger }

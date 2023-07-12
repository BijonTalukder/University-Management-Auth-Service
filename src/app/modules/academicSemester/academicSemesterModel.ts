import { Schema, model } from 'mongoose'
import { AcademicSemesterModel, IAcademicSemester } from './academicSemester.interface'
import ApiError from '../../error/ApiError'

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      required: true,
      type: String,
      enum:['Autumn','Summar','Fall']
    },
    year: {
      required: true,
      type: String,
    },
    code: {
      required: true,
      type: String,
      enum:['01','02','03']
    },
    startMonth: {
      required: true,
      type: String,
      enum:[
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    },
    endMonth: {
      required: true,
      type: String,
      enum:[  'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December']
    },
  },
  {
    timestamps: true,
  }
)
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title:this.title,
    year:this.year
  })
  if(isExist){
    throw new ApiError(209,'Academic semester is already exists')
  }
  next()
})
export const AcademicSemester= model<IAcademicSemester,AcademicSemesterModel>('AcademicSemester',academicSemesterSchema)

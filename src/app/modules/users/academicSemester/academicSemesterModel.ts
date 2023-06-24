import { Schema, model } from 'mongoose'
import { AcademicSemesterModel, IAcademicSemester } from './academicSemester.interface'

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      required: true,
      type: String,
      enum:['Autumn','Summar','Fall']
    },
    year: {
      required: true,
      type: Number,
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
export const AcademicSemester= model<IAcademicSemester,AcademicSemesterModel>('AcademicSemester',academicSemesterSchema)

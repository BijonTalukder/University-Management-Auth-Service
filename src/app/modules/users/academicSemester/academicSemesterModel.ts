import { Schema, model } from 'mongoose'
import { AcademicSemesterModel, IAcademicSemester } from './academicSemester.interface'

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      required: true,
      type: String,
      enum
    },
    year: {
      required: true,
      type: Number,
    },
    code: {
      required: true,
      type: String,
    },
    startMonth: {
      required: true,
      type: String,
    },
    endMonth: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
)
export const AcademicSemester= model<IAcademicSemester,AcademicSemesterModel>('AcademicSemester',academicSemesterSchema)

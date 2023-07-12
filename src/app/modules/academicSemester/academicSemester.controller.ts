import { NextFunction, Request, RequestHandler, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import pick from '../../../shared/pick'

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )
    res.status(200).json({
      success: true,
      message: 'Academic semester is created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const getAllSemester = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const paginationOptions = {
    //   page: Number(req.query.paage),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // }
    const paginationOptions = pick(req.query,['page', 'limit', 'sortBy','sortOrder'])
   const filters = pick(req.query,['searchTerm']);
    const result = await AcademicSemesterService.getAllSemesters(filters,paginationOptions)
    res.status(200).json({
      statusCode: 200,
      success:true,
      message:'semester retrive success',
      data:result
    })
   
  
  } catch (err) {
    next(err)
  }
}
export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
}

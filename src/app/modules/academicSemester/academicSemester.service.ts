import { SortOrder } from "mongoose";
import { IpaginationOptions } from "../../../interfaces/paggination";
import ApiError from "../../error/ApiError";
import { academicSemesterTitleCodeMapper } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemesterModel";

const createSemester = async (payload:IAcademicSemester):Promise<IAcademicSemester> =>{
  if(academicSemesterTitleCodeMapper[payload.title]!==payload.code){
  throw new ApiError(400,'Invalid Semester Code')
  }
 
  const result =  await AcademicSemester.create(payload)
  return result;
}
type IGenericResponse<T>={
  meta:{
    page:number;
    limit:number;
    total:number;
  }
  data:T;
}
const getAllSemesters= async(paginationOptions:IpaginationOptions):Promise<IGenericResponse<IAcademicSemester[]>>=>{
  const {page=1,limit=100,sortBy,sortOrder} = paginationOptions
  const skip  = (page-1)*limit;
  const sortConditions:{[key:string]:SortOrder} ={}
  if(sortBy && sortOrder){
    sortConditions[sortBy] = sortOrder;
  }
  const result = await AcademicSemester.find().sort(sortConditions).skip(skip).limit(limit)
const total = await AcademicSemester.countDocuments()
return {
  meta:{
    page,
    limit,
    total
  },
  data:result
}

}

export const AcademicSemesterService = {createSemester,getAllSemesters}
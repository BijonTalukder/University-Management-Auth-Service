import { SortOrder } from "mongoose";
import { IpaginationOptions } from "../../../interfaces/paggination";
import ApiError from "../../error/ApiError";
import { academicSemesterTitleCodeMapper } from "./academicSemester.constant";
import { IAcademicSemester, IAcademicSemesterFilters } from "./academicSemester.interface";
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
const getAllSemesters= async( filters:IAcademicSemesterFilters,paginationOptions:IpaginationOptions):Promise<IGenericResponse<IAcademicSemester[]>>=>{
  
  const {searchTerm,...filtersData} = filters
  const academicSemesterSearchableFields= ['title','code','year']
  const andCondition =[]
  if(searchTerm){
    andCondition.push({
      $or:academicSemesterSearchableFields.map(field =>({
        [field]:{  $regex:field,
          $options:'i'}
    
      }))
    })

  }
  if(Object.keys(filtersData).length){
    andCondition.push({
      $and:Object.entries(filtersData).map(([field,value])=>({
        [field]:value
      }))
    })
   
  }
  const andConditions =[
   { $or:[
      {
        title:{
          $regex:searchTerm,
          $options:'i',

        }
      },{
        code:{
          $regex:searchTerm,
          $options:'i',
        }
      },{
        year:{
          $regex:searchTerm,
          $options:'i',
        }
      }
    ]}
   ]
  const {page=1,limit=100,sortBy,sortOrder} = paginationOptions
  const skip  = (page-1)*limit;
  const sortConditions:{[key:string]:SortOrder} ={}
  if(sortBy && sortOrder){
    sortConditions[sortBy] = sortOrder;
  }
  const whareConditions = andCondition.length>0?{$and:andCondition}:{}
  const result = await AcademicSemester.find(whareConditions).sort(sortConditions).skip(skip).limit(limit)
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
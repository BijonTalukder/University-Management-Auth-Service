import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './users.model'

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id?lastUser?.id.substring(4):undefined
}

export const generatedUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')

  //increment by one
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  return incrementedId
  // lastUserId++
  // return String(lastUserId).padStart(5, '0')
}
export const generateStudentId = async (academicSemester:IAcademicSemester):Promise<string> =>{
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0') //00000
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementId=`${academicSemester.year.substring(2)}${academicSemester.code}${incrementId}`
  console.log(incrementId)

  return incrementId
}

export const findLastFacultyId = async():Promise<string | undefined> =>{
  const lastFaculty = await User.findOne({},{id:1,_id:0}).sort({createdAt:-1}).lean()
  return lastFaculty?.id?lastFaculty?.id.substring(2):undefined
}

export const generateFacultyId = async ():Promise<string> =>{
  const currentId = (await findLastFacultyId()) || (0).toString().padStart(5,'0')
  let incrementedId = (parseInt(currentId)+1).toString().padStart(5,'0')
  incrementedId= `F-${incrementedId}`
  return incrementedId
}
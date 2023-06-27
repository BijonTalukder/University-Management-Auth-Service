import express from 'express'
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();
router.post('/create-academic-semester',AcademicSemesterController.createSemester)
export const AcademicSemesterRoutes = router
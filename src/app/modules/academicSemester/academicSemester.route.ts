import express from 'express'
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();
router.post('/create-academic-semester',AcademicSemesterController.createSemester)
router.get('/get-all-academic-semesters',AcademicSemesterController.getAllSemester)

export const AcademicSemesterRoutes = router
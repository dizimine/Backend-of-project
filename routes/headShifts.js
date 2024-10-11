import express from 'express';
import { isHead } from '../middleware/protection.js';
import { getTodayShift, headShiftDetails } from '../controllers/shift.js';
const router = express.Router();

router.get('/headShift',isHead,headShiftDetails);
router.get('/todayShift',isHead,getTodayShift);

export default router;
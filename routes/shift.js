import express from 'express';
const router = express.Router();
import {getAllShifts, getSingleShift, shiftCreation, updateShift} from '../controllers/shift.js';
import { isManager} from '../middleware/protection.js';

router.use(isManager);
router.post('/newshift',shiftCreation);
router.put('/updateshift/:id',updateShift);
router.get('/getshifts',getAllShifts);
router.get('/:id',getSingleShift);



export default router;
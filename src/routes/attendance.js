import Router from 'express';
import { attendance_add, 
          attendance_selected, 
          attendance_update, 
          attendance_delete,
          attendances_list } from '../controllers/attendance.js'

const router = Router();

// Attendances routes
router.get('/', attendances_list);
router.post('/', attendance_add);
router.get('/:attendanceId', attendance_selected);
router.put('/:attendanceId', attendance_update);
router.delete('/:attendanceId', attendance_delete);

export default router;
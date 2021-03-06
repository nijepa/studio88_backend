import Router from 'express';
import { schedule_add, 
          schedule_selected, 
          schedule_update, 
          schedule_delete,
          schedules_list,
          not_clients } from '../controllers/schedule.js'

const router = Router();

// Schedules routes
router.get('/', schedules_list);
router.post('/', schedule_add);
router.get('/:scheduleId', schedule_selected);
router.put('/:scheduleId', schedule_update);
router.delete('/:scheduleId', schedule_delete);
router.get('/clientsnot/:scheduleId', not_clients);

export default router;
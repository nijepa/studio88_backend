import Router from 'express';
import { general_add, 
          general_selected, 
          general_update, 
          general_delete,
          generals_list } from '../controllers/general.js'

const router = Router();

// Expenses routes
router.get('/', generals_list);
router.post('/', general_add);
router.get('/:generalId', general_selected);
router.put('/:generalId', general_update);
router.delete('/:generalId', general_delete);

export default router;
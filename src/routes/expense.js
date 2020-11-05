import Router from 'express';
import { expense_add, 
          expense_selected, 
          expense_update, 
          expense_delete,
          expenses_list } from '../controllers/expense.js'

const router = Router();

// Expenses routes
router.get('/', expenses_list);
router.post('/', expense_add);
router.get('/:expenseId', expense_selected);
router.put('/:expenseId', expense_update);
router.delete('/:expenseId', expense_delete);

export default router;
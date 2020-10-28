import Router from 'express';
import { payment_add, 
          payment_selected, 
          payment_update, 
          payments_list } from '../controllers/payment.js'

const router = Router();

// Payments routes
router.get('/', payments_list);
router.post('/', payment_add);
router.get('/:paymentId', payment_selected);
router.put('/:paymentId', payment_update);

export default router;
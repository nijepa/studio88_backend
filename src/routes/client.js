import Router from 'express';
import { client_add, 
          client_profile, 
          client_update, 
          client_delete,
          clients_list } from '../controllers/client.js'

const router = Router();

// Client
router.get('/', clients_list);
router.post('/', client_add);
router.get('/:clientId', client_profile);
router.put('/:clientId', client_update);
router.delete('/:clientId', client_delete);

export default router;
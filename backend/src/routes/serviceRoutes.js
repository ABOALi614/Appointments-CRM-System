import { Router } from 'express';
import { createService, listServices, updateService } from '../controllers/serviceController.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { serviceValidator } from '../validators/serviceValidators.js';

const router = Router();

router.get('/', requireAuth, listServices);
router.post('/', requireAuth, requireRole('admin'), serviceValidator, validate, createService);
router.patch('/:id', requireAuth, requireRole('admin'), serviceValidator, validate, updateService);

export default router;

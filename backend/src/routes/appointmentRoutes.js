import { Router } from 'express';
import {
  createAppointment,
  listAppointments,
  updateAppointment
} from '../controllers/appointmentController.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
  createAppointmentValidator,
  updateAppointmentValidator
} from '../validators/appointmentValidators.js';

const router = Router();

router.get('/', requireAuth, listAppointments);
router.post('/', requireAuth, createAppointmentValidator, validate, createAppointment);
router.patch('/:id', requireAuth, updateAppointmentValidator, validate, updateAppointment);
router.patch('/:id/admin', requireAuth, requireRole('admin'), updateAppointmentValidator, validate, updateAppointment);

export default router;

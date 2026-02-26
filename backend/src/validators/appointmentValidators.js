import { body } from 'express-validator';

export const createAppointmentValidator = [
  body('serviceId').isMongoId().withMessage('serviceId must be a valid id'),
  body('startAt').isISO8601().withMessage('startAt must be a valid date')
];

export const updateAppointmentValidator = [
  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'done', 'cancelled'])
    .withMessage('Invalid status'),
  body('assignedStaffId').optional().isMongoId().withMessage('assignedStaffId must be a valid id'),
  body('amountPaid').optional().isFloat({ min: 0 }).withMessage('amountPaid must be >= 0')
];

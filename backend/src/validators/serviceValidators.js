import { body } from 'express-validator';

export const serviceValidator = [
  body('name').isLength({ min: 2 }).withMessage('Service name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be >= 0'),
  body('durationMinutes').isInt({ min: 5 }).withMessage('Duration must be >= 5 minutes')
];

import { body } from 'express-validator';

export const registerValidator = [
  body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 chars'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars')
];

export const loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

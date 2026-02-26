import { Router } from 'express';
import { getOverviewReport } from '../controllers/reportController.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

const router = Router();

router.get('/overview', requireAuth, requireRole('admin'), getOverviewReport);

export default router;

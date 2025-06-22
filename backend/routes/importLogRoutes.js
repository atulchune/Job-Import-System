import express from 'express';
import { getImportLogs } from '../controllers/importLogController.js';
import { getDashboardCardCounts} from '../controllers/dashboardCardsController.js';
const router = express.Router();

// GET /api/import-logs
router.get('/import_logs', getImportLogs);
router.get('/dashboard_counts', getDashboardCardCounts);

export default router;

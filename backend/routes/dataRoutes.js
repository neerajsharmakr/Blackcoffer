// routes/dataRoutes.js

import express from 'express';
import { getData } from '../controllers/dataController.js';

const router = express.Router();

// GET API to fetch data
router.get('/data', getData);

export default router;

import express from 'express';
import { readData, writeData } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await readData('settings');
  res.json(Array.isArray(data) ? data[0] || {} : data);
});

router.put('/', authMiddleware, async (req, res) => {
  await writeData('settings', [req.body]);
  res.json(req.body);
});

export default router;

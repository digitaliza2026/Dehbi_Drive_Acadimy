import express from 'express';
import { readData, writeData, generateId } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

export function createCrudRouter(resourceName, { publicGet = true } = {}) {
  const router = express.Router();

  // GET all - public by default
  router.get('/', async (req, res) => {
    if (!publicGet && !req.headers.authorization) {
      return res.status(401).json({ error: 'Non autorisé' });
    }
    const items = await readData(resourceName);
    res.json(items);
  });

  // GET one
  router.get('/:id', async (req, res) => {
    const items = await readData(resourceName);
    const item = items.find(i => i.id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Introuvable' });
    res.json(item);
  });

  // POST create
  router.post('/', async (req, res) => {
    const items = await readData(resourceName);
    const newItem = { id: generateId(), createdAt: new Date().toISOString(), ...req.body };
    items.push(newItem);
    await writeData(resourceName, items);
    res.status(201).json(newItem);
  });

  // PUT update - protected
  router.put('/:id', authMiddleware, async (req, res) => {
    const items = await readData(resourceName);
    const idx = items.findIndex(i => i.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Introuvable' });
    items[idx] = { ...items[idx], ...req.body, id: req.params.id };
    await writeData(resourceName, items);
    res.json(items[idx]);
  });

  // DELETE - protected
  router.delete('/:id', authMiddleware, async (req, res) => {
    const items = await readData(resourceName);
    const filtered = items.filter(i => i.id !== req.params.id);
    await writeData(resourceName, filtered);
    res.json({ success: true });
  });

  return router;
}

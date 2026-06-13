import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../config.js';
import { authMiddleware } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AUTH_FILE = path.join(__dirname, '../data/auth.json');

async function getAuthData() {
  try {
    const raw = await fs.readFile(AUTH_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    const passwordHash = await bcrypt.hash(config.admin.password, 10);
    const authData = { username: config.admin.username, passwordHash };
    await fs.writeFile(AUTH_FILE, JSON.stringify(authData, null, 2), 'utf-8');
    return authData;
  }
}

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const authData = await getAuthData();
    if (username !== authData.username) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }
    const match = await bcrypt.compare(password, authData.passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }
    const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: '7d' });
    return res.json({ token, username });
  } catch {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ valid: false });
  try {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, config.jwtSecret);
    res.json({ valid: true });
  } catch {
    res.status(401).json({ valid: false });
  }
});

router.post('/change-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Le nouveau mot de passe doit contenir au moins 6 caractères' });
  }
  try {
    const authData = await getAuthData();
    const match = await bcrypt.compare(currentPassword, authData.passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
    }
    authData.passwordHash = await bcrypt.hash(newPassword, 10);
    await fs.writeFile(AUTH_FILE, JSON.stringify(authData, null, 2), 'utf-8');
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;

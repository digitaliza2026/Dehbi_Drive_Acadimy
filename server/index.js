import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';
import authRoutes from './routes/auth.js';
import settingsRoutes from './routes/settings.js';
import uploadRoutes from './routes/upload.js';
import { createCrudRouter } from './routes/crud.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // curl / same-origin
    if (allowedOrigins.length === 0) return cb(null, true); // permissive default
    if (allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`Origin not allowed: ${origin}`));
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Serve uploaded images
app.use('/uploads', express.static(uploadsDir));

app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

// Public CRUD resources
app.use('/api/hero', createCrudRouter('hero'));
app.use('/api/formations', createCrudRouter('formations'));
app.use('/api/etablissements', createCrudRouter('etablissements'));
app.use('/api/temoignages', createCrudRouter('temoignages'));
app.use('/api/galerie', createCrudRouter('galerie'));
app.use('/api/creneaux', createCrudRouter('creneaux'));
app.use('/api/reservations', createCrudRouter('reservations'));
app.use('/api/messages', createCrudRouter('messages'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || config.port;
app.listen(PORT, () => {
  console.log(`🚗 Dehbi Drive Academy server running on port ${PORT}`);
});

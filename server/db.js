import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

export async function readData(filename) {
  const filepath = path.join(DATA_DIR, `${filename}.json`);
  try {
    const data = await fs.readFile(filepath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

export async function writeData(filename, data) {
  const filepath = path.join(DATA_DIR, `${filename}.json`);
  await fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

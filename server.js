import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'db.json');
const JWT_SECRET = 'hotel-management-dev-secret';
const PORT = 3001;

function readDb() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

function nextId() {
  return Math.random().toString(36).slice(2, 12);
}

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  const { name, phone, email, password, role } = req.body;
  const db = readDb();

  if (db.users.some((u) => u.email === email)) {
    return res.status(400).json({ message: 'That email is already registered.' });
  }

  const hashed = await bcrypt.hash(password, 8);
  const user = {
    id: nextId(),
    name,
    phone,
    email,
    password: hashed,
    role: role || 'user',
  };

  db.users.push(user);
  writeDb(db);

  const accessToken = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: '7d',
  });

  const { password: _omit, ...safeUser } = user;
  res.status(201).json({ user: safeUser, accessToken });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  const user = db.users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const accessToken = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: '7d',
  });

  const { password: _omit, ...safeUser } = user;
  res.json({ user: safeUser, accessToken });
});

const collections = [
  'hotels',
  'roomTypes',
  'rooms',
  'reservations',
  'amenities',
  'roomAmenities',
  'hotelAmenities',
  'reviews',
  'payments',
  'offers',
  'hotelRatings'
];

const idFieldByCollection = {
  hotels: 'hotel_id',
  roomTypes: 'room_type_id',
  rooms: 'id',
  reservations: 'reservation_id',
  amenities: 'amenity_id',
  roomAmenities: 'id',
  hotelAmenities: 'id',
  reviews: 'review_id',
  payments: 'payment_id',
  offers: 'id',
  hotelRatings:'hotel_id'
};

collections.forEach((collection) => {
  const idField = idFieldByCollection[collection];

  app.get(`/${collection}`, (req, res) => {
    const db = readDb();
    let list = db[collection];

    Object.entries(req.query).forEach(([key, value]) => {
      list = list.filter((item) => String(item[key]) === String(value));
    });

    res.json(list);
  });

  app.get(`/${collection}/:id`, (req, res) => {
    const db = readDb();
    const item = db[collection].find((i) => String(i[idField]) === req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  });

  app.post(`/${collection}`, (req, res) => {
    const db = readDb();
    const item = { ...req.body, [idField]: nextId() };
    db[collection].push(item);
    writeDb(db);
    res.status(201).json(item);
  });

  app.put(`/${collection}/:id`, (req, res) => {
    const db = readDb();
    const index = db[collection].findIndex((i) => String(i[idField]) === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Not found' });
    db[collection][index] = { ...db[collection][index], ...req.body, [idField]: req.params.id };
    writeDb(db);
    res.json(db[collection][index]);
  });

  app.delete(`/${collection}/:id`, (req, res) => {
    const db = readDb();
    db[collection] = db[collection].filter((i) => String(i[idField]) !== req.params.id);
    writeDb(db);
    res.status(204).end();
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
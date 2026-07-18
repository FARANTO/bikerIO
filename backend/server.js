import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get('/api/apps', async (req, res) => {
  try {
    const [apps] = await pool.query(`
      SELECT a.id, a.title, a.companyName, a.image, a.description, a.size, a.reviews, a.ratingAvg, a.downloads
      FROM apps a
      ORDER BY a.id ASC
    `);

    const appIds = apps.map((app) => app.id);
    const [ratings] = await pool.query(
      `SELECT app_id, name, count FROM ratings WHERE app_id IN (?) ORDER BY app_id ASC, FIELD(name, '5 star', '4 star', '3 star', '2 star', '1 star')`,
      [appIds]
    );

    const ratingsByApp = ratings.reduce((acc, row) => {
      if (!acc[row.app_id]) acc[row.app_id] = [];
      acc[row.app_id].push({ name: row.name, count: row.count });
      return acc;
    }, {});

    const data = apps.map((app) => ({ ...app, ratings: ratingsByApp[app.id] || [] }));
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch apps' });
  }
});

app.get('/api/apps/:id', async (req, res) => {
  try {
    const [apps] = await pool.query(
      `SELECT id, title, companyName, image, description, size, reviews, ratingAvg, downloads
       FROM apps WHERE id = ?`,
      [req.params.id]
    );

    if (apps.length === 0) {
      return res.status(404).json({ error: 'App not found' });
    }

    const [ratings] = await pool.query(
      `SELECT name, count FROM ratings WHERE app_id = ? ORDER BY FIELD(name, '5 star', '4 star', '3 star', '2 star', '1 star')`,
      [req.params.id]
    );

    res.json({ ...apps[0], ratings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch app details' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Backend running on port ${process.env.PORT}`);
});

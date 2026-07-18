import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST || process.env.MYSQLHOST || process.env.RAILWAY_DB_HOST || null,
  port: Number(process.env.DB_PORT || process.env.MYSQLPORT || process.env.RAILWAY_DB_PORT || 3306),
  user: process.env.DB_USER || process.env.MYSQLUSER || process.env.RAILWAY_DB_USER || null,
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || process.env.RAILWAY_DB_PASSWORD || '',
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || process.env.RAILWAY_DB_NAME || null,
};

const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function hasDatabaseConfig() {
  return Boolean(dbConfig.host && dbConfig.user && dbConfig.database);
}

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'bikerIO backend is running' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/apps', async (req, res) => {
  if (!hasDatabaseConfig()) {
    return res.status(500).json({
      error: 'Database is not configured yet.',
      details: 'Set DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, and DB_NAME in Railway.',
    });
  }

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
    console.error('Failed to fetch apps:', error);
    res.status(500).json({ error: 'Failed to fetch apps', details: error.message });
  }
});

app.get('/api/apps/:id', async (req, res) => {
  if (!hasDatabaseConfig()) {
    return res.status(500).json({
      error: 'Database is not configured yet.',
      details: 'Set DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, and DB_NAME in Railway.',
    });
  }

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
    console.error('Failed to fetch app details:', error);
    res.status(500).json({ error: 'Failed to fetch app details', details: error.message });
  }
});

app.get('/api/orders/:appId', async (req, res) => {
  if (!hasDatabaseConfig()) {
    return res.status(500).json({
      error: 'Database is not configured yet.',
      details: 'Set DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, and DB_NAME in Railway.',
    });
  }

  try {
    const [orders] = await pool.query(
      `SELECT order_id, status FROM orders WHERE app_id = ? ORDER BY order_id DESC LIMIT 1`,
      [req.params.appId]
    );

    if (orders.length === 0) {
      return res.json({ isOrdered: false, orderId: null, status: 'none' });
    }

    const latestOrder = orders[0];
    res.json({
      isOrdered: latestOrder.status === 'active',
      orderId: latestOrder.order_id,
      status: latestOrder.status,
    });
  } catch (error) {
    console.error('Failed to fetch order state:', error);
    res.status(500).json({ error: 'Failed to fetch order state', details: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  if (!hasDatabaseConfig()) {
    return res.status(500).json({
      error: 'Database is not configured yet.',
      details: 'Set DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, and DB_NAME in Railway.',
    });
  }

  try {
    const { appId, action } = req.body;

    if (!appId || !action) {
      return res.status(400).json({ error: 'appId and action are required' });
    }

    if (action === 'add') {
      const [result] = await pool.query(
        `INSERT INTO orders (app_id, status) VALUES (?, 'active')`,
        [appId]
      );

      return res.status(201).json({
        success: true,
        isOrdered: true,
        orderId: result.insertId,
      });
    }

    if (action === 'remove') {
      const [result] = await pool.query(
        `UPDATE orders SET status = 'removed' WHERE app_id = ? AND status = 'active' ORDER BY order_id DESC LIMIT 1`,
        [appId]
      );

      return res.json({
        success: true,
        isOrdered: false,
        updated: result.affectedRows > 0,
      });
    }

    return res.status(400).json({ error: 'Unsupported action' });
  } catch (error) {
    console.error('Failed to update order:', error);
    res.status(500).json({ error: 'Failed to update order', details: error.message });
  }
});

const port = Number(process.env.PORT || 5000);

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running on port ${port}`);
});

import express from 'express';
import { pool } from '../config/dbconfig';

const router = express.Router();

router.get('/getEntries', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM submissions');
    res.json(rows);
  } catch (error) {
    console.error('Error getting entries:', error);
    res.status(500).send('Server error');
  }
});

// CREATE TABLE submissions (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   username VARCHAR(255) NOT NULL,
//   code_language VARCHAR(255) NOT NULL,
//   stdin TEXT,
//   source_code TEXT NOT NULL,
//   submission_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

export default router;
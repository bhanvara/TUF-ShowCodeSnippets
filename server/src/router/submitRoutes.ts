import express from 'express';
import { pool } from '../config/dbconfig';

const router = express.Router();

router.post('/submitCode', async (req, res) => {
  const { username, code_language, stdin, source_code } = req.body;
  try {
    const [rows, fields] = await pool.query(
      'INSERT INTO submissions (username, code_language, stdin, source_code) VALUES (?,?,?,?)',
      [username, code_language, stdin, source_code]
    );
    res.json({ message: 'Submission successful' });
  } catch (error) {
    console.error('Error submitting code:', error);
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
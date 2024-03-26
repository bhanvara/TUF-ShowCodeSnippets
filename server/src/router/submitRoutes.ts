import express from 'express';
import { pool } from '../config/dbconfig';
import {createClient} from 'redis';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
import axios from 'axios';

async function makeSubmission(code_language: string, source_code: string, stdin: string) {
  let language_id: number = 0;
  if (code_language === 'C++') {
    language_id = 54;
  } else if (code_language === 'JavaScript') {
    language_id = 93;
  } else if (code_language === 'Java') {
    language_id = 62;
  } else if (code_language === 'Python') {
    language_id = 71;
  }
  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: {
      base64_encoded: 'false',
      fields: '*'
    },
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },

    data: {
      language_id: language_id, 
      source_code: source_code,
      stdin: stdin
    }
  };

  try {
    console.log('Making submission with options:', options)
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

router.post('/submitCode', async (req: express.Request, res: express.Response) => {
  let { username, code_language, stdin, source_code } = req.body;
  const response = await makeSubmission(code_language, source_code, stdin);

  const client = await createClient({ url: 'rediss://red-co1bf6uct0pc73fm28jg:O1E9TQCAcvx1lJH4s01zAk1MaiapQmcZ@oregon-redis.render.com:6379' })
  .on('error', (err) => {
    console.error('Redis client error:', err);
  }).connect();
  
  if (!response) {
    res.status(500).send('Error generating submission token');
    return;
  }

  const submissionToken = response.data.token;

  try {
    const [rows, fields] = await pool.query(
      'INSERT INTO submissions (username, code_language, stdin, source_code, submissionToken) VALUES (?,?,?,?,?)',
      [username, code_language, stdin, source_code, submissionToken]
    );

    client.del('entries');

    res.status(response.status).json({ submissionToken, message: 'Submission successful', submitted: {username: username, code_language: code_language, stdin: stdin, source_code: source_code} });
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
//   submissionToken TEXT,
//   submission_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

export default router;
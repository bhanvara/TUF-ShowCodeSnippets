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

  const client = await createClient({ url: process.env.REDIS_URL })
  .on('error', (err) => {
    console.error('Redis client error:', err);
  }).connect();

  const response = await makeSubmission(code_language, source_code, stdin);

  if (!response) {
    res.status(500).send('Error generating submission token');
    return;
  }

  const submissionToken = response.data.token;

  const output = await new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      const options = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}`,
        params: {
          base64_encoded: 'false',
          fields: '*'
        },
        headers: {
          'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        if (response.data.status.id <= 2) {
          console.log('Submission is still running');
        } else {
          clearInterval(interval);
          resolve(response.data.stdout);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    }, 1000);
  });

  try {
    const [rows, fields] = await pool.query(
      'INSERT INTO submissions (username, code_language, stdin, source_code, submissionToken, output) VALUES (?,?,?,?,?,?)',
      [username, code_language, stdin, source_code,submissionToken, output]
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
//   output TEXT,
//   submission_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

export default router;
import express from 'express';
import { pool } from '../config/dbconfig';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.X_RAPIDAPI_KEY);

const router = express.Router();
import axios from 'axios';

async function makeSubmission(code_language: string, source_code: string, stdin: string) {

  // code_language = Buffer.from(code_language, 'base64').toString();
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

    // send base64_encoded message
    // data: {
    //   language_id: language_id,
    //   source_code: Buffer.from(source_code).toString('base64'),
    //   stdin: Buffer.from(stdin).toString('base64')
    // }
  };

  console.log('Making submission with options:', options)

  try {
    const response = await axios.request(options);
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);
    return response.data.token;
  } catch (error) {
    console.error(error);
    return null;
  }
}

router.post('/submitCode', async (req: express.Request, res: express.Response) => {
  let { username, code_language, stdin, source_code } = req.body;
  const submissionToken = await makeSubmission(code_language, source_code, stdin);

  // convert code_language, stdin, source_code from base64 to string
  // code_language = Buffer.from(code_language, 'base64').toString();
  // stdin = Buffer.from(stdin, 'base64').toString();
  // source_code = Buffer.from(source_code, 'base64').toString();

  if (!submissionToken) {
    res.status(500).send('Error generating submission token');
    return;
  }

  try {
    const [rows, fields] = await pool.query(
      'INSERT INTO submissions (username, code_language, stdin, source_code, submissionToken) VALUES (?,?,?,?,?)',
      [username, code_language, stdin, source_code, submissionToken]
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
//   submissionToken TEXT,
//   submission_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

export default router;
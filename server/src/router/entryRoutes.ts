import express from 'express';
import { pool } from '../config/dbconfig';
import {createClient} from 'redis';

const router = express.Router();

router.get('/getEntries', async (req: express.Request, res: express.Response) => {
  const client = await createClient({ url: process.env.REDIS_URL })
  .on('error', (err) => {
    console.error('Redis client error:', err);
  }).connect();

  // if (client.isReady) {
  //   console.log('Client is connected to Redis');
  // } else {
  //   console.log('Client is not connected to Redis');
  // }

  const redisKey = 'entries';

  async function getEntriesFromDatabase() {
    return client.get(redisKey).then((entries: string | null) => {
      if (entries) {
        console.log('Fetching entries from cache');
        return res.json(JSON.parse(entries));
      } else {
        console.log('Fetching entries from database');
        return pool.query('SELECT * FROM submissions').then(([rows, fields]) => {
          client.setEx(redisKey, 3600, JSON.stringify(rows)); // Cache for 1 hour
          return res.json(rows);
        }).catch((error) => {
          console.error('Error getting entries:', error);
          return res.status(500).send('Server error');
        });
      }
    }).catch((error) => {
      console.error('Error getting entries from Redis:', error);
      return res.status(500).send('Server error');
    }).finally(() => {
      client.quit();
    });
  }
  getEntriesFromDatabase();
});

// router.get('/getEntries', async (req: express.Request, res: express.Response) => {
//   try {
//     const [rows, fields] = await pool.query('SELECT * FROM submissions');
//     res.json(rows);
//   } catch (error) {
//     console.error('Error getting entries:', error);
//     res.status(500).send('Server error');
//   }
// });


// CREATE TABLE submissions (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   username VARCHAR(255) NOT NULL,
//   code_language VARCHAR(255) NOT NULL,
//   stdin TEXT,
//   source_code TEXT NOT NULL,
//   output TEXT,
//   submission_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );


export default router;
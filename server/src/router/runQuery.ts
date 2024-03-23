import express from 'express';
import { pool } from '../config/dbconfig';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    
    const query = req.body;
    try {
        const [rows, fields] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error running query:', error);
    }
});


export default router;
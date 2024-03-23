import app from './src/app'; 
import { PORT } from './src/config/config';
import { Request, Response } from 'express';
const port = PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Backend for takeUforward!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
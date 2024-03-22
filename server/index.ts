import { PORT } from './src/config/config';
import app from './src/app'; 

const port = PORT;

app.get('/', (req, res) => {
  res.send('Backend for takeUforward!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
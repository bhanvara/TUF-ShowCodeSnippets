import express from 'express';
import submitRoutes from './router/submitRoutes';
import entryRoutes from './router/entryRoutes';
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/submit",submitRoutes);
// /api/submit/submitCode
app.use("/api/entries",entryRoutes);
// /api/entries/getEntries

export default app;
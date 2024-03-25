import express from 'express';
import cors from 'cors'; 
import submitRoutes from './router/submitRoutes';
import entryRoutes from './router/entryRoutes';
import { run } from 'node:test';
import runQuery from './router/runQuery';
import bodyParser from 'body-parser';

const app = express();

app.use(cors()); // add this line to enable all CORS requests


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/runQuery",runQuery);
app.use("/api/submit",submitRoutes);
// /api/submit/submitCode
app.use("/api/entries",entryRoutes);
// /api/entries/getEntries

export default app;
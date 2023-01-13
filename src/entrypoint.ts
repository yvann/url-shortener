import express from 'express';
import assert from 'node:assert';
import process from 'node:process';
import { router } from './url-shortener/router.js';

const rawPort = process.env.HTTP_PORT;
assert(rawPort, 'The environment variable "HTTP_PORT" must be defined');
const port: number = Number.parseInt(rawPort);

const app = express();

app.use('/api/shorturl', router);

app.listen(port, () => console.debug(`Listening on port ${port}`));

import type { IncomingMessage, ServerResponse } from 'node:http';
import { createApp } from './index.js';

const app = createApp();

export default function handler(req: IncomingMessage, res: ServerResponse) {
  (app as unknown as (req: IncomingMessage, res: ServerResponse) => void)(req, res);
}

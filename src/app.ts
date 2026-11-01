import express from 'express';
import { requireAuth } from './shared/auth.js';
import doctorsRouter from './features/doctors/index.js';
import leaveRouter from './features/leave/index.js';

/**
 * createApp — factory that builds and returns the Express application.
 * Exported separately from server.ts so tests can create the app without
 * binding a port (server.ts is never imported in tests).
 */
export function createApp() {
  const app = express();

  app.use(express.json());

  // Auth guard applied globally — every request must carry valid headers (W2).
  app.use(requireAuth);

  // Feature routers — stubs at skeleton stage; routes added by feature units.
  app.use('/doctors', doctorsRouter);
  app.use('/leave', leaveRouter);

  return app;
}

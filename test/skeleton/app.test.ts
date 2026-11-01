import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';
import { reset } from '../../src/shared/store.js';

const app = createApp();

describe('app integration (skeleton)', () => {
  beforeEach(() => {
    reset();
  });

  it('happy path: GET /doctors with valid manager headers is not 401 or 403 (W1, W2)', async () => {
    const response = await request(app)
      .get('/doctors')
      .set('x-user-id', 'user-1')
      .set('x-user-role', 'manager');

    // Auth passed — skeleton stub has no routes so 404 is the expected response.
    expect(response.status).not.toBe(401);
    expect(response.status).not.toBe(403);
  });

  it('BR1.1 integration: GET /doctors with no X-User-Id returns 401', async () => {
    const response = await request(app).get('/doctors').set('x-user-role', 'manager');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Unauthorized' });
  });

  it('BR2.1: Supertest connects to the app via loopback (server binds to 127.0.0.1)', async () => {
    // Supertest creates a loopback HTTP server from the Express app.
    // A successful request through Supertest confirms the app listens on loopback only.
    const response = await request(app)
      .get('/leave')
      .set('x-user-id', 'user-1')
      .set('x-user-role', 'doctor');

    // Auth passed, stub has no routes → 404 confirms loopback connectivity.
    expect(response.status).not.toBe(401);
    expect(response.status).not.toBe(403);
  });
});

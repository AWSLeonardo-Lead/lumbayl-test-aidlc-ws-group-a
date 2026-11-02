import { describe, it, expect, beforeEach } from 'vitest';
import supertest from 'supertest';
import { createApp } from '../../src/app.js';
import { reset, seed } from '../../src/shared/store.js';

const app = createApp();
const request = supertest(app);

describe('Doctors API', () => {
  beforeEach(() => {
    reset();
  });

  // AC2.1.1 — manager adds a doctor successfully (happy path)
  it('AC2.1.1: POST /doctors as manager returns 201 with the created doctor', async () => {
    const res = await request
      .post('/doctors')
      .set('X-User-Id', 'u1')
      .set('X-User-Role', 'manager')
      .send({ id: 'asha', name: 'Asha Rao' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 'asha', name: 'Asha Rao' });
  });

  // AC2.1.2 — duplicate id returns 409
  it('AC2.1.2: POST /doctors with duplicate id returns 409', async () => {
    await request
      .post('/doctors')
      .set('X-User-Id', 'u1')
      .set('X-User-Role', 'manager')
      .send({ id: 'asha', name: 'Asha Rao' });

    const res = await request
      .post('/doctors')
      .set('X-User-Id', 'u1')
      .set('X-User-Role', 'manager')
      .send({ id: 'asha', name: 'Asha Rao Again' });

    expect(res.status).toBe(409);
  });

  // AC2.1.3 — wrong role returns 403
  it('AC2.1.3: POST /doctors as doctor role returns 403', async () => {
    const res = await request
      .post('/doctors')
      .set('X-User-Id', 'u1')
      .set('X-User-Role', 'doctor')
      .send({ id: 'asha', name: 'Asha Rao' });

    expect(res.status).toBe(403);
  });

  // AC2.1.4 — missing required field returns 400
  it('AC2.1.4: POST /doctors with missing name returns 400', async () => {
    const res = await request
      .post('/doctors')
      .set('X-User-Id', 'u1')
      .set('X-User-Role', 'manager')
      .send({ id: 'asha' });

    expect(res.status).toBe(400);
  });

  // AC2.2.1 — GET returns doctors when list is non-empty (happy path)
  it('AC2.2.1: GET /doctors returns 200 with a non-empty array after seeding', async () => {
    seed();

    const res = await request
      .get('/doctors')
      .set('X-User-Id', 'u1')
      .set('X-User-Role', 'doctor');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // AC2.2.2 — GET returns empty array when no doctors
  it('AC2.2.2: GET /doctors returns 200 with empty array when store is empty', async () => {
    const res = await request
      .get('/doctors')
      .set('X-User-Id', 'u1')
      .set('X-User-Role', 'doctor');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  // AC2.2.3 — unauthenticated GET returns 401
  it('AC2.2.3: GET /doctors without auth headers returns 401', async () => {
    const res = await request.get('/doctors');

    expect(res.status).toBe(401);
  });
});

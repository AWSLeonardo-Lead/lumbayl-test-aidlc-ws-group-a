import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import { requireAuth, requireRole } from '../../src/shared/auth.js';
import type { AuthContext } from '../../src/shared/auth.js';

// Lightweight mock request: simulates Express's req.headers plain object.
function makeReq(headers: Record<string, string> = {}, auth?: AuthContext): Partial<Request> {
  return { headers, auth } as Partial<Request>;
}

// Chainable mock response that captures status code and JSON body.
function makeRes() {
  const captured = { statusCode: 0, body: null as unknown };
  const res = {
    status(code: number) {
      captured.statusCode = code;
      return res;
    },
    json(body: unknown) {
      captured.body = body;
      return res;
    },
    _captured: captured,
  };
  return res as unknown as Response & { _captured: typeof captured };
}

describe('requireAuth', () => {
  let next: NextFunction;

  beforeEach(() => {
    next = vi.fn();
  });

  it('AC1.1.1: missing X-User-Id header returns 401 (BR1.1)', () => {
    const req = makeReq({ 'x-user-role': 'manager' });
    const res = makeRes();

    requireAuth(req as Request, res, next);

    expect(res._captured.statusCode).toBe(401);
    expect(res._captured.body).toEqual({ error: 'Unauthorized' });
    expect(next).not.toHaveBeenCalled();
  });

  it('AC1.1.2: missing X-User-Role header returns 401 (BR1.2)', () => {
    const req = makeReq({ 'x-user-id': 'user-1' });
    const res = makeRes();

    requireAuth(req as Request, res, next);

    expect(res._captured.statusCode).toBe(401);
    expect(res._captured.body).toEqual({ error: 'Unauthorized' });
    expect(next).not.toHaveBeenCalled();
  });

  it('AC1.1.5: unknown role value returns 403 (BR1.3)', () => {
    const req = makeReq({ 'x-user-id': 'user-1', 'x-user-role': 'admin' });
    const res = makeRes();

    requireAuth(req as Request, res, next);

    expect(res._captured.statusCode).toBe(403);
    expect(res._captured.body).toEqual({ error: 'Forbidden' });
    expect(next).not.toHaveBeenCalled();
  });

  it('happy path: valid manager headers attach req.auth and call next()', () => {
    const req = makeReq({ 'x-user-id': 'user-1', 'x-user-role': 'manager' });
    const res = makeRes();

    requireAuth(req as Request, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect((req as Request).auth).toEqual({ userId: 'user-1', role: 'manager' });
  });
});

describe('requireRole', () => {
  let next: NextFunction;

  beforeEach(() => {
    next = vi.fn();
  });

  it('AC1.1.3: doctor role on manager-required route returns 403 (BR1.4)', () => {
    const req = makeReq({}, { userId: 'user-1', role: 'doctor' });
    const res = makeRes();

    requireRole('manager')(req as Request, res, next);

    expect(res._captured.statusCode).toBe(403);
    expect(res._captured.body).toEqual({ error: 'Forbidden' });
    expect(next).not.toHaveBeenCalled();
  });

  it('AC1.1.4: manager role on doctor-required route returns 403 (BR1.4)', () => {
    const req = makeReq({}, { userId: 'user-1', role: 'manager' });
    const res = makeRes();

    requireRole('doctor')(req as Request, res, next);

    expect(res._captured.statusCode).toBe(403);
    expect(res._captured.body).toEqual({ error: 'Forbidden' });
    expect(next).not.toHaveBeenCalled();
  });

  it('happy path: correct role calls next()', () => {
    const req = makeReq({}, { userId: 'user-1', role: 'manager' });
    const res = makeRes();

    requireRole('manager')(req as Request, res, next);

    expect(next).toHaveBeenCalledOnce();
  });
});

import type { Request, Response, NextFunction } from 'express';
import { sendUnauthorized, sendForbidden } from './errors.js';

export interface AuthContext {
  userId: string;
  role: 'manager' | 'doctor';
}

// Augment Express Request to carry auth context after requireAuth middleware runs.
declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}

const VALID_ROLES = new Set<string>(['manager', 'doctor']);

/**
 * requireAuth middleware — validates X-User-Id and X-User-Role headers,
 * attaches AuthContext to req.auth, and calls next().
 *
 * BR1.1: missing/empty X-User-Id → 401
 * BR1.2: missing/empty X-User-Role → 401
 * BR1.3: unknown role value → 403
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const userId = req.headers['x-user-id'];
  const userRole = req.headers['x-user-role'];

  if (!userId || (typeof userId === 'string' && userId.trim() === '')) {
    sendUnauthorized(res);
    return;
  }

  if (!userRole || (typeof userRole === 'string' && userRole.trim() === '')) {
    sendUnauthorized(res);
    return;
  }

  const roleValue = Array.isArray(userRole) ? userRole[0] : userRole;

  if (!VALID_ROLES.has(roleValue)) {
    sendForbidden(res);
    return;
  }

  const userIdValue = Array.isArray(userId) ? userId[0] : userId;

  req.auth = {
    userId: userIdValue,
    role: roleValue as 'manager' | 'doctor',
  };

  next();
}

/**
 * requireRole factory — returns middleware that enforces a specific role.
 *
 * BR1.4: wrong role for endpoint → 403
 */
export function requireRole(role: 'manager' | 'doctor') {
  return function roleGuard(req: Request, res: Response, next: NextFunction): void {
    if (req.auth?.role !== role) {
      sendForbidden(res);
      return;
    }
    next();
  };
}

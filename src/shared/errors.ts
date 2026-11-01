import type { Response } from 'express';

/**
 * Sends a 401 Unauthorized response (BR1.1, BR1.2).
 */
export function sendUnauthorized(res: Response): void {
  res.status(401).json({ error: 'Unauthorized' });
}

/**
 * Sends a 403 Forbidden response (BR1.3, BR1.4).
 */
export function sendForbidden(res: Response): void {
  res.status(403).json({ error: 'Forbidden' });
}

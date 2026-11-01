/**
 * In-memory store for the clinic leave application.
 * All data lives here; no external persistence (BR2.2).
 * Feature routes import from this module — never from another feature's code.
 */

export interface Doctor {
  id: string;
  name: string;
}

export interface LeaveRequest {
  id: string;
  doctorId: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD (must be >= startDate)
  status: 'pending' | 'approved' | 'rejected';
}

interface Store {
  doctors: Doctor[];
  leaveRequests: LeaveRequest[];
}

export const store: Store = {
  doctors: [],
  leaveRequests: [],
};

/**
 * Clears both collections. Call in beforeEach for test isolation (NFR3.3 / BR2.2).
 */
export function reset(): void {
  store.doctors = [];
  store.leaveRequests = [];
}

/**
 * Pre-populates both collections with deterministic test fixtures (NFR3.3).
 * Always call reset() before seed() to avoid duplicate entries.
 */
export function seed(): void {
  store.doctors.push({
    id: 'doc-1',
    name: 'Dr. Alice Smith',
  });

  store.leaveRequests.push({
    id: 'leave-1',
    doctorId: 'doc-1',
    startDate: '2026-01-10',
    endDate: '2026-01-14',
    status: 'pending',
  });
}

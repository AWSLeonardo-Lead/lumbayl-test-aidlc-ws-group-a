import { describe, it, expect, beforeEach } from 'vitest';
import { store, reset, seed } from '../../src/shared/store.js';

describe('store', () => {
  beforeEach(() => {
    reset();
  });

  it('store.doctors and store.leaveRequests are arrays (NFR3.1)', () => {
    expect(Array.isArray(store.doctors)).toBe(true);
    expect(Array.isArray(store.leaveRequests)).toBe(true);
  });

  it('reset() clears both collections (BR2.2 / NFR3.3)', () => {
    // Arrange: seed first so there is data to clear
    seed();
    expect(store.doctors.length).toBeGreaterThan(0);
    expect(store.leaveRequests.length).toBeGreaterThan(0);

    // Act
    reset();

    // Assert
    expect(store.doctors).toHaveLength(0);
    expect(store.leaveRequests).toHaveLength(0);
  });

  it('seed() adds at least one Doctor and one LeaveRequest (NFR3.3)', () => {
    seed();

    expect(store.doctors.length).toBeGreaterThanOrEqual(1);
    expect(store.leaveRequests.length).toBeGreaterThanOrEqual(1);
  });

  it('after reset() then seed(), both collections are non-empty (NFR3.3)', () => {
    // First populate and clear
    seed();
    reset();

    // Then reseed
    seed();

    expect(store.doctors.length).toBeGreaterThan(0);
    expect(store.leaveRequests.length).toBeGreaterThan(0);
  });
});

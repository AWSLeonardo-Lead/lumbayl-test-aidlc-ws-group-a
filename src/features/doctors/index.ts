import { Router } from 'express';
import { z } from 'zod';
import { requireRole } from '../../shared/auth.js';
import { store } from '../../shared/store.js';

/**
 * Doctors feature router — U2.
 * POST /doctors  — manager only; creates a new doctor (FR2.1, NFR2)
 * GET  /doctors  — any authenticated user; lists all doctors (FR2.2)
 * requireAuth is applied globally in app.ts; this router adds no extra auth
 * middleware on GET and adds requireRole("manager") on POST only (BR2.5).
 */

const DoctorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

const doctorsRouter = Router();

// POST /doctors — manager-only, Zod-validated, uniqueness-checked (FR2.1)
doctorsRouter.post('/', requireRole('manager'), (req, res) => {
  const parseResult = DoctorSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: 'Validation failed', details: parseResult.error.issues });
    return;
  }

  const { id, name } = parseResult.data;

  const existing = store.doctors.find((d) => d.id === id);
  if (existing) {
    res.status(409).json({ error: 'Doctor already exists' });
    return;
  }

  store.doctors.push({ id, name });
  res.status(201).json({ id, name });
});

// GET /doctors — any authenticated user; requireAuth already enforces 401 globally (FR2.2)
doctorsRouter.get('/', (_req, res) => {
  res.status(200).json(store.doctors);
});

export default doctorsRouter;

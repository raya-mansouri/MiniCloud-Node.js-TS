// server/src/routes/containers.ts
import { Router } from 'express';
import { createContainer, startContainer, stopContainer, removeContainer, updateContainer } from '../controllers/containers';

const router = Router();

router.post('/', createContainer);
router.post('/:id/start', startContainer);
router.post('/:id/stop', stopContainer);
router.delete('/:id', removeContainer);
router.put('/:id', updateContainer);

export default router;
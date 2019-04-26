import { Router } from 'express';
import UserController from './UserController';

const router = Router();

router.post('/login', UserController.login);
router.post('/register', UserController.register);

export default router;

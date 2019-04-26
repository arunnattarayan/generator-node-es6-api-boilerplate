import { Router } from 'express';
import UserController from './UserController';

const router = Router();

router.get('/', UserController.search);

export default router;

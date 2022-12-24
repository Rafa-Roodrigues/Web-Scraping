import { Router } from 'express';
import { valorEconomicoController } from './valorEconomicoController.js';
import { postsController } from './postsController.js';

export const routes = Router();

routes.use('/valoreconomico', valorEconomicoController);
routes.use('/posts', postsController);
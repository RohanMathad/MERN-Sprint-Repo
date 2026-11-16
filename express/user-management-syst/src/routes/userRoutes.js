import express from 'express';
import { getUsers, createUser, deleteUser, updateUser } from '../controllers/userControllers.js';

const router = express.Router();

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .put(updateUser)
    .delete(deleteUser);

export default router;

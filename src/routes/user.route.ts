import express from 'express';
import { GetAllUsers, GetOneUser } from '../controller/user.controller';

const userRoutes = express.Router()

userRoutes.get('/', GetAllUsers);
userRoutes.get('/:id', GetOneUser);

export {userRoutes}
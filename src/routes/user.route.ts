import express from 'express';
import { GetAllUsers } from '../controller/user.controller';

const userRoutes = express.Router()

userRoutes.get('/', GetAllUsers);

export {userRoutes}
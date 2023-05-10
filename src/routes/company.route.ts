import express from 'express';
import { CreateCompany } from '../controller/company.controller';

const companyRoutes = express.Router()

companyRoutes.post('/', CreateCompany);

export {companyRoutes}
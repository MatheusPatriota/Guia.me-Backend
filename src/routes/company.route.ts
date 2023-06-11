import express from "express"
import {
	CreateCompany,
	GenerateCompaniesRecommendation,
	GenerateJobsRecomendation,
} from "../controller/company.controller"

const companyRoutes = express.Router()

companyRoutes.post("/", CreateCompany)

companyRoutes.post(
	"/GenerateCompaniesRecommendation",
	GenerateCompaniesRecommendation
)

companyRoutes.post("/GenerateJobsRecomendation", GenerateJobsRecomendation)

export { companyRoutes }

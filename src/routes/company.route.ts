import express from "express"
import {
	CreateCompany,
	GenerateCompaniesRecommendation,
	GenerateJobsRecommendation,
} from "../controller/company.controller"

const companyRoutes = express.Router()

companyRoutes.post("/", CreateCompany)

companyRoutes.post(
	"/GenerateCompaniesRecommendation",
	GenerateCompaniesRecommendation
)

companyRoutes.post("GenerateJobsRecommendation", GenerateJobsRecommendation)

export { companyRoutes }

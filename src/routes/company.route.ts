import express from "express"
import {
	CreateCompany,
	GenerateCompaniesRecommendation,
} from "../controller/company.controller"

const companyRoutes = express.Router()

companyRoutes.post("/", CreateCompany)
companyRoutes.post(
	"/GenerateCompaniesRecommendation",
	GenerateCompaniesRecommendation
)

export { companyRoutes }

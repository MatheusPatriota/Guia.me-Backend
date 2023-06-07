import express from "express"
import { userRoutes } from "./user.route"
import { companyRoutes } from "./company.route"

const routes = express.Router()

routes.use("/user", userRoutes)
routes.use("/company", companyRoutes)

export { routes }

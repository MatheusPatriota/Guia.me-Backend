import express from "express";
import {
  GetAllUsers,
  GetOneUser,
  UpdateUserInformation,
  validateToken,
} from "../controller/user.controller";

const userRoutes = express.Router();

userRoutes.get("/", GetAllUsers);
userRoutes.get("/:id", GetOneUser);
userRoutes.put("/:id", UpdateUserInformation);
userRoutes.post("/validateToken", validateToken);

export { userRoutes };

import { Request, Response } from "express";
import { auth } from "../config/firebase.config";
import { validateFirebaseToken } from "../utils/validateToken";

const GetAllUsers = async (req: Request, res: Response, next: any) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("Authorization token not found");

    const isValidToken = await validateFirebaseToken(token);
    if (!isValidToken) throw new Error("Invalid authorization token");

    const users = await auth.listUsers();
    console.log("users", users);
    if (!isValidToken) throw new Error("Error in load all users");

    return res.status(200).json({
      message: "Esse é seu primeiro request",
      users: users.users,
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export { GetAllUsers };

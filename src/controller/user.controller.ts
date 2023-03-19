import { Request, Response } from "express";
import { auth } from "../config/firebase.config";
import { validateFirebaseToken } from "../utils/validateToken";

const GetAllUsers = async (request: Request, response: Response, next: any) => {
  try {
    const token = request.headers.authorization;
    if (!token) throw new Error("Authorization token not found");

    const isValidToken = await validateFirebaseToken(token);
    if (!isValidToken) throw new Error("Invalid authorization token");

    const users = await auth.listUsers();
    console.log("users", users);
    if (!isValidToken) throw new Error("Error in load all users");

    return response.status(200).json({
      message: "Request Successful",
      users: users.users,
    });
  } catch (error) {
    console.error(error);
    return response.status(401).json({
      message: "Unauthorized",
    });
  }
};

const GetOneUser = async (request: Request, response: Response) => {
  try {
    const userId = request.params.id;
    console.log("userId", userId)

    if (!userId) throw new Error("User id parameter not found");

    const token = request.headers.authorization;
    if (!token) throw new Error("Authorization token not found");

    const isValidToken = await validateFirebaseToken(token);
    if (!isValidToken) throw new Error("Invalid authorization token");

    const user = await auth.getUser(userId);
    console.log("user", user);

    return response.status(200).json({
      message: "Request Successful",
      users: user,
    });
  } catch (error) {
    console.error(error);
    return response.status(401).json({
      message: "Unauthorized",
    });
  }
};

export { GetAllUsers, GetOneUser };

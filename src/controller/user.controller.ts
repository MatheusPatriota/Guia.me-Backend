import { Request, Response } from "express";
import { auth, db } from "../config/firebase.config";
import { validateFirebaseToken } from "../utils/validateToken";

/**
 * Get all users in firestore database
 * @param request
 * @param response
 * @param next
 * @returns
 */
const GetAllUsers = async (request: Request, response: Response, next: any) => {
  try {
    const token = request.headers.authorization;
    if (!token) throw new Error("Authorization token not found");

    const isValidToken = await validateFirebaseToken(token);
    if (!isValidToken) throw new Error("Invalid authorization token");

    const userCollection = db.collection("users");
    if (!userCollection) throw new Error("Error in load all users");

    userCollection
      .get()
      .then((querySnapshot) => {
        const users: any = [];
        querySnapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        return response.status(200).json({
          message: "Request Successful",
          users: users,
        });
      })
      .catch((err) => {
        // console.log("Error getting users:", err);
        return response.status(500).send("Error getting users");
      });
  } catch (error: any) {
    // console.error(error);
    return response.status(401).json({
      message: "Unauthorized",
      errorMessage: error.message,
    });
  }
};

/**
 * Get user by Id in firestore
 * @param request
 * @param response
 * @returns
 */

const GetOneUser = async (request: Request, response: Response) => {
  try {
    const userId = request.params.id;
    console.log("userId", userId);

    if (!userId) throw new Error("User id parameter not found");

    const token = request.headers.authorization;
    if (!token) throw new Error("Authorization token not found");

    const isValidToken = await validateFirebaseToken(token);
    if (!isValidToken) throw new Error("Invalid authorization token");

    const userCollection = db.collection("users");
    if (!userCollection) throw new Error("Error in load all users");

    const userDoc = userCollection.doc(userId);

    userDoc.get().then((doc) => {
      if (!doc.exists) {
        throw new Error("User not found!");
      } else {
        // console.log("user", doc.data());
        return response.status(200).json({
          message: "Request Successful",
          user: doc.data(),
        });
      }
    });
  } catch (error: any) {
    // console.error(error);
    return response.status(401).json({
      message: "Unauthorized",
      errorMessage: error.message,
    });
  }
};

export { GetAllUsers, GetOneUser };

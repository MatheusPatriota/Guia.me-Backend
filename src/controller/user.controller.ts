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
      errorMessage: error,
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
      errorMessage: error,
    });
  }
};
/**
 * Get user by Id in firestore
 * @param request
 * @param response
 * @returns
 */

const UpdateUserInformation = async (request: Request, response: Response) => {
  try {
    const userId = request.params.id;
    const data = request.body;

    console.log("userId", userId);
    console.log("data", data);
    
    if (!data) throw new Error("Data body not found");
    if (Object.keys(data).length === 0) throw new Error("Data body is empty");
    
    if (!userId) throw new Error("User id parameter not found");
    
    const token = request.headers.authorization;
    if (!token) throw new Error("Authorization token not found");
    console.log("token", token);
    
    const isValidToken = await validateFirebaseToken(token);
    if (!isValidToken) throw new Error("Invalid authorization token");
    console.log("isValidToken", isValidToken);

    const userCollection = db.collection("users");
    if (!userCollection) throw new Error("users collection not found");

    const userDoc = userCollection.doc(userId);

    userDoc.get().then((doc) => {
      if (!doc.exists) {
        throw new Error("User not found!");
      } else {
        userDoc.update(data).then((doc) => {
          return response.status(200).json({
            message: "Request Successful",
            user: data,
          });
        });
        // console.log("user", doc.data());
      }
    });
  } catch (error: any) {
    // console.error(error);
    return response.status(401).json({
      message: "Unauthorized",
      errorMessage: error,
    });
  }
};

const validateToken = async (request: Request, response: Response) => {
  try {
    const token = request.body.authToken
    if(!token) throw new Error("Token not provided")

    const decodedToken = await auth.verifyIdToken(token);
    if(!decodedToken) throw new Error("Invalid token")

    // console.log("/----------------------/")
    // console.log("decodedToken", decodedToken)
    // console.log("/----------------------/")
    return response.status(200).json({
      message: "Token is valid",
      isValid: true,
    });
  } catch (error: any) {
    console.log("error", error);
    return response.status(401).json({
      message: "token is invalid",
      isValid: false,
      errorMessage: error.message,
    });
  }
}

export { GetAllUsers, GetOneUser, UpdateUserInformation,validateToken };

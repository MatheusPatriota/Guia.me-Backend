import {  auth } from "../config/firebase.config";

export const validateFirebaseToken = async (token: string): Promise<any>  => {
  const filteredToken = token ? token.split(' ')[1] : "";
  try {
    const decodedToken = await auth.verifyIdToken(filteredToken);
    return true;
  } catch (error: any) {
    console.log("error", error);
    throw new Error("Invalid Token");
  }
};
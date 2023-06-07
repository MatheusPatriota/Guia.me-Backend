import {  auth } from "../config/firebase.config";

export const validateFirebaseToken = async (token: string): Promise<any>  => {
  const filteredToken = token ? token.split(' ')[1] : "";
  // console.log("/----------------------/")
  // console.log("token", filteredToken)
  // console.log("/----------------------/")
  try {
    const decodedToken = await auth.verifyIdToken(filteredToken);
    // console.log("/----------------------/")
    // console.log("decodedToken", decodedToken)
    // console.log("/----------------------/")
    return true;
  } catch (error: any) {
    console.log("error", error);
    return false;
  }
};
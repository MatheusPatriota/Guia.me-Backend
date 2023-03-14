/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { auth } from "src/config/firebase.config";

@Injectable()
export class UserService {
  async listUsers(): Promise<any> {
    const listUsersResult = await auth.listUsers();
    const users = listUsersResult.users;
    return users;
  }
  // async getUser(userId: string): Promise<admin.auth.UserRecord> {
  //   const userResult = await admin.auth().getUser(userId);
  //   console.log("user result", userResult);
  //   return userResult;
  // }
  //login with google
  async authenticateWithFirebase(token: string): Promise<string> {
    try {
      console.log("token", token)
      const decodedToken = await auth.verifyIdToken(token);

      const user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name,
        photoURL: decodedToken.picture,
        provider: decodedToken.firebase.sign_in_provider,
      };

      const authToken = jwt.sign(user, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });

      return authToken;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

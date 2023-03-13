/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  async listUsers(): Promise<admin.auth.UserRecord[]> {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users;
    return users;
  }
  async getUser(userId: string): Promise<admin.auth.UserRecord> {
    const userResult = await admin.auth().getUser(userId);
    console.log("user result", userResult);
    return userResult;
  }
  //login with google
  async authenticateWithFirebase(token: string): Promise<string> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);

      const user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name,
        photoURL: decodedToken.picture,
        provider: decodedToken.firebase.sign_in_provider,
      };

      const authToken = jwt.sign(user, 'your-secret-key', {
        expiresIn: '1h',
      });

      return authToken;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

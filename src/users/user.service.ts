/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
import { firestore } from "src/config/firebase.config";
import * as firebase from 'firebase';
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
  async signInWithGoogle(token: string) {
    const credential = firebase.auth.GoogleAuthProvider.credential(token);
    const { user } = await firebase.auth().signInWithCredential(credential);

    const userRef = firestore.collection('users').doc(user.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      await userRef.set({
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });
    }

    return user;
  }
}

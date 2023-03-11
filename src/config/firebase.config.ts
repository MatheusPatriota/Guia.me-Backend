/* eslint-disable prettier/prettier */
import * as firebase from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

export function initializeFirebase() {
  const serviceAccount = JSON.parse(process.env.FIREBASE);
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

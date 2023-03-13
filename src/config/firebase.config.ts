/* eslint-disable prettier/prettier */
import * as admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const auth = admin.auth();
const firestore = admin.firestore();

export { auth, firestore };

import admin from "firebase-admin";
import * as dotenv from 'dotenv';
dotenv.config();

const firebaseEnv = process.env.FIREBASE || "{}";
const serviceAccount = JSON.parse(firebaseEnv);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const auth = admin.auth();
const db = admin.firestore();

export { admin, auth, db };

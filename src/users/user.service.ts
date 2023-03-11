/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";

@Injectable()
export class UserService {
  async listUsers(): Promise<admin.auth.UserRecord[]> {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users;
    return users;
  }
}
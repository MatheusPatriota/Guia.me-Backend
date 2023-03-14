/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";

import { auth } from "src/config/firebase.config";

@Injectable()
export class UsersService {
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
  
}

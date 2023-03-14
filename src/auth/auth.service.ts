/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { auth } from "src/config/firebase.config";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // constructor(
  //   private usersService: UsersService,
  //   private jwtService: JwtService
  // ) {}

  async authenticateWithFirebase(token: string): Promise<string> {
    try {
      console.log("token", token);
      if (!token) {
        throw new Error("token is empty");
      }
      const decodedToken = await auth.verifyIdToken(token);

      const user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name,
        photoURL: decodedToken.picture,
        provider: decodedToken.firebase.sign_in_provider,
      };

      const authToken = jwt.sign(user, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      return authToken;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

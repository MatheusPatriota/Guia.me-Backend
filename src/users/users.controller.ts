import { Controller, Get, Header, UseGuards, Param } from "@nestjs/common";
import { ExtractJwt } from "passport-jwt";

import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

const token = ExtractJwt.fromAuthHeaderAsBearerToken();
console.log("token backend", token);
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Header("Authorization", `Bearer ${token.toString}`)
  async getAllUsers() {
    try {
      const users = await this.userService.listUsers();
      return users;
    } catch (error) {
      return { error: error };
    }
  }
  
  @Get(":userId")
  @UseGuards(JwtAuthGuard)
  @Header("Authorization", `Bearer ${token.toString}`)
  async getUserById(@Param("userId") userId: string) {
    console.log("user ", userId);
    const user = await this.userService.getUser(userId);
    return user;
  }

  // @Get("protected")
  // @UseGuards(AuthGuard("jwt"))
  // protectedRoute() {
  //   return "This is a protected route";
  // }
}

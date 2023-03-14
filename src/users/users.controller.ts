import { Controller, Get, Header, UseGuards } from "@nestjs/common";
import { ExtractJwt } from "passport-jwt";
import { JwtAuthGuard } from "src/auth/JwtAuthGuard";

import { UsersService } from "./users.service";

const token = ExtractJwt.fromAuthHeaderAsBearerToken();
console.log("token backend", token);
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Header("Authorization", `Bearer ${token.toString}`)
  async getAllUsers() {
    const users = await this.userService.listUsers();
    return users;
  }

  // @Get(":userId")
  // async getUserById(@Param("userId") userId: string) {
  //   console.log("user ", userId);
  //   const user = await this.userService.getUser(userId);
  //   return user;
  // }

  // @Get("protected")
  // @UseGuards(AuthGuard("jwt"))
  // protectedRoute() {
  //   return "This is a protected route";
  // }
}

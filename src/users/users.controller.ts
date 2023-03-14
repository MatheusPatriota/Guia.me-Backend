import {
  Controller,
  Get,
  Param,
  Request,
  Post,
  UseGuards,
  Header,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/JwtAuthGuard";
import { UserService } from "./user.service";
import { ExtractJwt } from "passport-jwt";

const token = ExtractJwt.fromAuthHeaderAsBearerToken();
console.log("token backend", token);
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Header("Authorization", `Bearer ${token} `)
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

  @Post("login")
  async login(@Request() req) {
    console.log("request", req);
    const authToken = await this.userService.authenticateWithFirebase(
      req.body.token
    );
    return { authToken };
  }

  @Get("protected")
  @UseGuards(AuthGuard("jwt"))
  protectedRoute() {
    return "This is a protected route";
  }
}

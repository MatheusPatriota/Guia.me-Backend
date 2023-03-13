import { Controller, Get, Param, Request } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const users = await this.userService.listUsers();
    return users;
  }

  @Get(":userId")
  async getUserById(@Param("userId") userId: string) {
    console.log("user ", userId);
    const user = await this.userService.getUser(userId);
    return user;
  }

  @Get("login")
  async login(@Request() req) {
    const authToken = await this.userService.authenticateWithFirebase(
      req.token
    );
    return { authToken };
  }

  // @Get("protected")
  // @UseGuards(AuthGuard("jwt"))
  // protectedRoute() {
  //   return "This is a protected route";
  // }
}

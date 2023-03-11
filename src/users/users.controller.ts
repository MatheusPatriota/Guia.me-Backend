import { Controller, Get, Param } from "@nestjs/common";
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
}

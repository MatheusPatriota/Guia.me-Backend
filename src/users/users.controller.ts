import { Controller, Get, Inject } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UsersController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const users = await this.userService.listUsers();
    return users;
  }
}

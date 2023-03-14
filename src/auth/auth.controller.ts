/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

console.log("entrei no Auth");
@Controller("account")
export class AuthController {
  constructor(private authService: AuthService) {
    console.log("construtor no Auth");
  }

  @Get()
  async defaultMessage() {
    console.log("entrei aqui");
    return "mensagem de boas vindas";
  }

  // @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    // console.log("request", req);
    try {
      const authToken = await this.authService.authenticateWithFirebase(
        req.body.token
      );
      return { authToken };
    } catch (error) {
      console.log("error", error);
      throw new BadRequestException({
        error: "Erro ao autenticar usuário",
        message: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("isLogged")
  getProfile(@Request() req) {
    try {
      return { message: "User is logged" };
    } catch (error) {
      // Aqui você pode tratar o erro e enviar uma resposta de erro para o cliente
      throw new BadRequestException({
        error: "Ocorreu um erro ao verificar o perfil do usuário.",
        message: error.message,
      });
    }
  }
}

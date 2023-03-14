/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  BadRequestException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./JwtAuthGuard";
import { LocalAuthGuard } from "./local-auth.guard";

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
    console.log("request", req);
    try {
      const authToken = await this.authService.authenticateWithFirebase(
        req.body.token
      );
      return { authToken };
    } catch (error) {
      throw new BadRequestException("Erro ao autenticar usuário");
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("isLogged")
  getProfile(@Request() req) {
    try {
      return req.user;
    } catch (error) {
      // Aqui você pode tratar o erro e enviar uma resposta de erro para o cliente
      return { error: "Ocorreu um erro ao verificar o perfil do usuário." };
    }
  }
}

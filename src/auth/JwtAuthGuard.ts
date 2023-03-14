/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

console.log("entrei no auth guard")
console.log("token aqui dentro: ",ExtractJwt.fromAuthHeaderAsBearerToken)
@Injectable()
export class JwtAuthGuard extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:  process.env.JWT_SECRET_KEY,
    });
  } 

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}

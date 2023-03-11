import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { initializeFirebase } from "./config/firebase.config";

dotenv.config();
initializeFirebase();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 5005);
}
bootstrap();

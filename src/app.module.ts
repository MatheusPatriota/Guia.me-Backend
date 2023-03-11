/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UserService } from './users/user.service';
import { TechnologiesModule } from './technologies/technologies.module';

@Module({
  imports: [TechnologiesModule],
  controllers: [UsersController],
  providers: [UserService],
})
export class AppModule {}

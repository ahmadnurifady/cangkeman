import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { usersProvider } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProvider],
})
export class UsersModule {}

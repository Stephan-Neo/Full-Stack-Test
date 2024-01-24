import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { User } from '../entities/user.entity';
import { Auth } from '../entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Auth])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

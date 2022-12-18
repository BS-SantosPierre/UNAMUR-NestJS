import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hobby } from 'src/entities/hobby.entity';
import { User } from 'src/entities/user.entity';
import { HobbiesService } from 'src/hobbies/hobbies.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	imports: [TypeOrmModule.forFeature([User, Hobby])],
  controllers: [UsersController],
  providers: [UsersService, HobbiesService]
})
export class UsersModule {}

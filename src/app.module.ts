import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Hobby } from './entities/hobby.entity';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'example',
			database: 'example',
			synchronize: true,
			entities: [User, Hobby]
		}),
		UsersModule
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

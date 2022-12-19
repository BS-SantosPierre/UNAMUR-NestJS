import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, UseInterceptors, UsePipes } from '@nestjs/common';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { CreateUserDTO } from 'src/dtos/users/users-create.dto';
import { UpdateUserDTO } from 'src/dtos/users/users-update.dto';
import { User } from 'src/entities/user.entity';
import { TransformInterceptor } from 'src/interceptors/transform/transform.interceptor';
import { CustomPipe } from 'src/pipes/custom-pipe/custom-pipe.pipe';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
	constructor(
		private readonly usersService: UsersService
	) {}

	@Get()
	async findAll() {
		console.log(Reflect.getMetadata('roles', this.findAll));
		return this.usersService.findAll();
	}

	@Get(':id')
	async findOne(
		@Param('id') id: number
	) {
		return this.usersService.findOne(id);
	}

	@Post()
	@UsePipes(new CustomPipe({ transform: true }))
	async create(@Body() dto: CreateUserDTO): Promise<User> {
		return this.usersService.create(dto);
	}

	@Put(':id')
	async update(
		@Body() dto: UpdateUserDTO,
		@Param('id', ParseIntPipe) id: number,
	) {
		const user = await this.usersService.findOne(id);

		if (!user) {
			throw new NotFoundException();
		}

		return this.usersService.update(user, dto);
	}

	@Post('many')
	async createMany(@Body() dto:CreateUserDTO[]){
		return await this.usersService.createMany(dto);
	}
}

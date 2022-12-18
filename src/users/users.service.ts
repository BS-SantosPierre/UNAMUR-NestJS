import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dtos/users/users-create.dto';
import { UpdateUserDTO } from 'src/dtos/users/users-update.dto';
import { Hobby } from 'src/entities/hobby.entity';
import { User } from 'src/entities/user.entity';
import { HobbiesService } from 'src/hobbies/hobbies.service';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly repo: Repository<User>,
		@Inject(forwardRef(() => HobbiesService))
		private readonly hobbiesService: HobbiesService
	){}

	async findAll(): Promise<[User[], number]> {
		return this.repo.findAndCount();
	}

	async findOne(id: number): Promise<User> {
		return this.repo.findOne({
			where: { id },
			relations: {
				hobbies: true
			}
		});
	}

	async create(dto: CreateUserDTO){
		// const user = new User();
		const user = this.repo.create();

		user.firstName = dto.firstName;
		user.lastName = dto.lastName;
		user.isAdmin = dto.isAdmin;
		user.hobbies = [];

		return this.repo.save(user);
	}

	async update(entity: User, dto: UpdateUserDTO){
		entity.firstName = dto.firstName;
		entity.lastName = dto.lastName;
		entity.isAdmin = dto.isAdmin;

		if (dto.hasOwnProperty('hobbies')) {
			const hobbies: Hobby[] = [];

			for (const hobby of dto.hobbies) {
				const h = new Hobby();
				h.name = hobby;
				h.userID = entity.id;

				hobbies.push(await this.hobbiesService.save(h));
			}

			entity.hobbies = hobbies;
		}

		return this.repo.save(entity);
	}
}
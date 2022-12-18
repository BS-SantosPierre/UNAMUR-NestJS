import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hobby } from 'src/entities/hobby.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class HobbiesService {
	constructor(
		@InjectRepository(Hobby)
		private readonly repo: Repository<Hobby>,
		private readonly usersService: UsersService
	){}

	async save(entity: Hobby) {
		return this.repo.save(entity)
	}
}

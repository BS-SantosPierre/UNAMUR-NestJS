import { forwardRef, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dtos/users/users-create.dto';
import { UpdateUserDTO } from 'src/dtos/users/users-update.dto';
import { Hobby } from 'src/entities/hobby.entity';
import { User } from 'src/entities/user.entity';
import { HobbiesService } from 'src/hobbies/hobbies.service';
import { EntityManager, Repository } from 'typeorm';

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

	async createMany(dto: CreateUserDTO[]){
		const users = [];

		await this.repo.manager.transaction(async (em: EntityManager) => {
			for (const { firstName, lastName, isAdmin } of dto) {
				if (await this._checkIfExist(firstName, lastName)) {
					throw new UnprocessableEntityException();
				}
				const user = em.create(User, {firstName, lastName, isAdmin});
				users.push(await em.save(user));
			}
		});

		return users;

		// const queryRunner = this.repo.queryRunner;

		// queryRunner.connect();

		// try {
		// 	queryRunner.commitTransaction();
		// } catch (error) {
		// 	queryRunner.rollbackTransaction();
		// } finally {
		// 	queryRunner.release();
		// }
	}

	private async _checkIfExist(firstName: string, lastName: string) {
		const qb = this.repo.createQueryBuilder('u')
								.where('LOWER(u.first_name) LIKE LOWER(:firstName)', {firstName})
								.andWhere('LOWER(u.last_name) LIKE LOWER(:lastName)', {lastName});

		const user = await qb.getOne();

		return user;
	}
}

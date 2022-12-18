import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hobby } from "./hobby.entity";

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'first_name' })
	firstName?: string;

	@Column({ name: 'last_name' })
	lastName: string;

	@Column({ name: 'is_admin', type: 'boolean', default: false  })
	isAdmin: boolean;

	@OneToMany(() => Hobby, (hobby) => hobby.user)
	hobbies: Hobby[];
}

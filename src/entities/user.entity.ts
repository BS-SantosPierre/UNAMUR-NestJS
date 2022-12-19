import { VarcharColumn } from "src/decorators/varchar-column/varchar-column.decorator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Hobby } from "./hobby.entity";

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@VarcharColumn('first_name')
	firstName?: string;

	@VarcharColumn('last_name')
	lastName: string;

	@Column({ name: 'is_admin', type: 'boolean', default: false  })
	isAdmin: boolean;

	@OneToMany(() => Hobby, (hobby) => hobby.user)
	hobbies: Hobby[];
}

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'hobbies' })
export class Hobby {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'name'})
	name: string;

	@ManyToOne(() => User, (user) => user.hobbies)
	@JoinColumn({ name: 'user_id' })
	user: User

	@Column({ name: 'user_id' })
	userID: number;
}

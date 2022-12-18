import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDTO } from "./users-create.dto";

export class UpdateUserDTO extends PartialType(CreateUserDTO){
	firstName: string;
	lastName: string;
	isAdmin: boolean;
	hobbies: string[];
}

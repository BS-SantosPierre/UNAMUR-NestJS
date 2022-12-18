import { Transform, TransformFnParams } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDTO {
	@IsNotEmpty()
	@IsString()
	@Length(2, 50)
	@Transform(({ value }: TransformFnParams) => value.toLowerCase())
	firstName: string;

	@IsNotEmpty()
	@IsString()
	@Length(2, 50)
	@Transform(({ value }: TransformFnParams) => value.toUpperCase())
	lastName: string;

	@IsBoolean()
	isAdmin: boolean;
}

"".toLowerCase

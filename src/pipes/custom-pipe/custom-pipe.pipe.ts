import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

type CustomPipeOption = {
	transform: boolean
}

@Injectable()
export class CustomPipe implements PipeTransform {
	constructor(public options?: CustomPipeOption){}
  async transform(value: any, { metatype }: ArgumentMetadata) {
		const transformValue = plainToInstance(metatype, value);

		const validationsError = await validate(transformValue);

		if(validationsError.length !== 0) {
			throw new UnprocessableEntityException({ errors: validationsError });
		}

		if (this.options.transform)	{
			return transformValue;
		}

    return transformValue;
  }
}

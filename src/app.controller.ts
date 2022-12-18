import {
	Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Ip,
  Param,
  Post,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable, of } from 'rxjs';
import { AppService } from './app.service';

@Controller({ path: 'app' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('coucou')
  @HttpCode(HttpStatus.OK)
  sayHi(@Req() req: Request, @Res() res: Response, @Ip() ip): any {
    console.log(req);

    res.json({
      message: 'Coucou',
    });
    // return {
    //   message: 'Coucou',
    // };
  }

  @Get(':slug/users/:id')
  getOne(
		@Param('slug') slug: string,
		@Param('id') id: number
	): any {
    return { slug, id };
  }

	@Get('all')
	async getAll(): Promise<any[]> {
		return [];
	}

	@Get('all-observe')
	getAllObserve(): Observable<any[]> {
		return of([1,2,3,4])
			.pipe(map(numbers => {
				return numbers.map((value) => value * 2)
			}));
	}


	@Post()
	@Redirect()
	create(@Body() dto: any){
		console.log(dto);
		return {
			url : 'https://www.unamur.be',
			statusCode : 302
		};
	}
}

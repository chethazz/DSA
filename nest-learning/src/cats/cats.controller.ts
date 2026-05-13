import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto): string {
    return `This creates a cat with ${createCatDto.name}, ${createCatDto.age}, ${createCatDto.breed}`;
  }

  @Get()
  findAll(@Query('age') age: number, @Query('breed') breed: string): string {
    return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
  }

  // By default build in exceptions like HttpException and those that inherit from this
  // are not shown in console, as they are treated as a part of the application flow
  // same applies to WsException and RpcException
  @Get('error')
  throwError() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('error/overidden')
  async throwOveriddenError() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await this.service.throwError();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `This action deletes a #${id} cat`;
  }
}

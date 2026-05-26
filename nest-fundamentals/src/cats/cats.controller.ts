import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { CatsService } from './cats.service';
import { CreateCatDtoClass } from './dto/create-cat.dto';
import { RolesGuard } from '../guards/roles.guard';

@Roles(['user'])
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UseGuards(RolesGuard)
  // Sets metadata role to ['user']
  @Roles(['admin'])
  async create(@Body() createCatDto: CreateCatDtoClass) {
    await this.catsService.create(createCatDto);
  }
}

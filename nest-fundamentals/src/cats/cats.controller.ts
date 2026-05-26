import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { CatsService } from './cats.service';
import { CreateCatDtoClass } from './dto/create-cat.dto';

@Roles('user')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UseGuards(RolesGuard)
  // Sets metadata role to ['user']
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDtoClass) {
    await this.catsService.create(createCatDto);
  }
}

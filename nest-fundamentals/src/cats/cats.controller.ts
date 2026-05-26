import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DiscoveryFlag } from '../decorators/discovery.decorator';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { CatsService } from './cats.service';
import { CreateCatDtoClass } from './dto/create-cat.dto';
import { ExampleService } from '../discovery/example.service';

@Roles('user')
@DiscoveryFlag('experimental')
@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly discoveryService: ExampleService,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  // Sets metadata role to ['user']
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDtoClass) {
    await this.catsService.create(createCatDto);
  }

  @Get('discovery')
  discovery() {
    this.discoveryService.getMetadata();
    return 'discovery route';
  }
}

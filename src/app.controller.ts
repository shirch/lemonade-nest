import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateEntityDto } from './entity/create.entity.dto';
import { Entity } from './entity/entity.interface';
import { UpdateEntityDto } from './entity/update.entity.dto';

@Controller('entities')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return id;
  }

  @Get()
  find(@Query('name') name: string): string {
    return name;
  }

  @Post()
  create(@Body() entity: CreateEntityDto): Entity {
    return this.appService.create(entity);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() entity: UpdateEntityDto): void {
    // This method is not implemented yet
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    // This method is not implemented yet
  }
}

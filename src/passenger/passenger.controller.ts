import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@UseGuards(JWTGuard)
@ApiTags('passengers')
@Controller('passenger')
export class PassengerController {
  constructor(private readonly services: PassengerService) { }

  @Post()
  create(@Body() passenger: PassengerDTO) {
    return this.services.create(passenger);
  }

  @Get()
  findAll() {
    return this.services.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.services.findOne(id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() passenger: PassengerDTO) {
    return this.services.updateOne(id, passenger);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.services.deleteOne(id);
  }
}
